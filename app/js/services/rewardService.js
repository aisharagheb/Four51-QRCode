four51.app.factory('Reward', ['Product', 'Address', 'Order', 'User', function(Product, Address, Order, User) {
    function _then(fn, data) {
        if (angular.isFunction(fn))
            fn(data);
    }

    function randomString() {
        var chars = "0123456789abcdefghijklmnop";
        var string_length = 7;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }

    function createUserObject(user, recipient) {
        var u = angular.copy(user);
        u.Username = recipient.Email + '_' + randomString();
        u.ConvertFromTempUser = true;
        u.FirstName = recipient.FirstName;
        u.LastName = recipient.LastName;
        u.Email = recipient.Email;
        u.Password = randomString();
        u.ConfirmPassword = u.Password;

        angular.forEach(u.CustomFields, function(field) {
            if (field.Name == 'Title') {
                field.Value = recipient.Title;
            }
        });

        return u;
    }

    function _create(productInteropID, recipient, user, success, error) {

        var u = createUserObject(user, recipient);
        User.save(u,
            function(usr) {
                Product.get(productInteropID,
                    function(product) {
                        var p = angular.copy(product);

                        var lineItem = {
                            ShipAddressID: '',
                            Quantity: 1,
                            Product: p,
                        };
                        var order = {
                            LineItems: [],
                            ShipAddressID: '',
                            PaymentMethod: 'PurchaseOrder',
                            FromUserID: usr.ID
                        };
                        var shipAddress = {
                            AddressName: recipient.Address1,
                            FirstName: recipient.FirstName,
                            LastName: recipient.LastName,
                            CompanyName: recipient.Company,
                            Street1: recipient.Address1,
                            Street2: recipient.Address2,
                            City: recipient.City,
                            State: recipient.State,
                            Zip: recipient.ZipCode,
                            Country: country,
                            IsShipping: true
                        };
                        Address.save(shipAddress,
                            function(address) {
                                lineItem.ShipAddressID = address.ID;
                                order.ShipAddressID = address.ID;

                                order.LineItems.push(lineItem);

                                Order.save(order,
                                    function(ordr) {
                                        Order.submit(ordr,
                                            function(o) {
                                                _then(success, o);
                                            },
                                            function(ex) {
                                                _then(error, ex);
                                                console.log('Failed to submit order');
                                            }
                                        );
                                    },
                                    function(ex) {
                                        _then(error, ex);
                                        console.log('Failed to save order');
                                    }
                                );
                            },
                            function(ex) {
                                _then(error, ex);
                                console.log('Failed to save address');
                            }
                        );
                    }
                );
            },
            function(ex) {
                _then(error, ex);
                console.log('Failed to save user');
            }
        );
    }

    return {
        create: _create
    }
}]);
four51.app.controller('RewardCtrl', ['$scope', '$location', '$routeParams', 'Resources', 'Reward', 'Email',
function ($scope, $location, $routeParams, Resources, Reward, Email) {

    $scope.generatingReward = false;
    $scope.rewardSuccess = false;
    $scope.rewardError = false;

    $scope.recipient = {Country: 'US'};
    $scope.sendMandrill = true;

    $scope.createReward = function() {
        $scope.generatingReward = true;
        $scope.showForm = false;
        Reward.create('RechargeableBatteryPack', $scope.recipient, $scope.user,
            function(order) {
                $scope.generatingReward = false;
                $scope.rewardSuccess = true;
                    if ($scope.sendMandrill){
                        Email.send($scope.recipient);
                    }
            },
            function(ex) {
                $scope.generatingReward = false;
                $scope.rewardError = true;
                console.log(ex);
            }
        );
    };


    $scope.showForm = true;

    $scope.countries = Resources.countries;
    $scope.states = Resources.states;

    $scope.hasStates = function() {
        return ($scope.recipient && $scope.recipient.Country) ? ($scope.recipient.Country == 'US' || $scope.recipient.Country == 'CA' || $scope.recipient.Country == 'NL') : false;
    };

}]);
/**
 * Created by Aisha on 5/5/2015.
 */


angular.module('OrderCloud-Mandrill', []);

angular.module('OrderCloud-Mandrill')
    .factory('Email', Email);
;

function Email() {
    var service = {
        send: send
    };
    return service;

    function send(recipient) {
        var mandrillAPIKey = "xkLmziSuBGmpV8LBDN6roQ"; //Enter your API key here
        mandrill_client = new mandrill.Mandrill(mandrillAPIKey);

        var template_name = "b2b-conference"; //Enter Mandrill Template Slug Here


        var message = {
            'to': [
                {
                    'email': recipient.Email,
                    'name': recipient.Name,
                    'type': 'to'
                }
                ]
        };
        var async = false;
        var ip_pool = "Main Pool";

        mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": {}, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
            console.log(result);
        }, function(e) {
            console.log('A Mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    }
}
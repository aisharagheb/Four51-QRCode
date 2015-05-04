four51.app.controller('RewardCtrl', ['$scope', '$location', '$routeParams', 'Resources', 'Reward',
function ($scope, $location, $routeParams, Resources, Reward) {

    $scope.generatingReward = false;
    $scope.rewardSuccess = false;
    $scope.rewardError = false;

    $scope.recipient = {};

    $scope.createReward = function() {
        $scope.generatingReward = true;
        $scope.showForm = false;
        Reward.create('ENTERPRODUCTAPIINTEROPIDHERE', $scope.recipient, $scope.user,
            function(order) {
                $scope.generatingReward = false;
                $scope.rewardSuccess = true;
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
        return ($scope.tempRecipient && $scope.tempRecipient.Country) ? ($scope.tempRecipient.Country == 'US' || $scope.tempRecipient.Country == 'CA' || $scope.tempRecipient.Country == 'NL') : false;
    };

}]);
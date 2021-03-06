'use strict';

angular.module('chidoriApp').controller('LoginCtrl', function ($scope, alert, auth, $auth) {
    function handleError() {
        alert('warning', 'Something went wrong!');
    }

    $scope.submit = function() {        
        $auth.login({
            email: $scope.email,
            password: $scope.password
        }).then(function(res) {
            var message = 'Thanks for coming back, ' + res.data.user.email + '!';
            
            if (!res.data.user.active) {
                message = 'Just a reminder, please check your email and activate your account soon.';
            }
            
            alert('success', 'Welcome!', message);
        }).catch(handleError);
    };
    
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(res) {
            alert('success', 'Welcome!', 'Thanks for coming back, ' + res.data.user.displayName + '!');
        }, handleError);
    };
});

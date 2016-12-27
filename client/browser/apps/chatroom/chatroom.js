'use strict';
angular.module('chatroomApp',['chatbox','btford.socket-io','ngResource','luegg.directives'])


.run(['$rootScope', '$window','chatroomService', function ($rootScope, $window,chatroomService) {  
    $window.app = {
        authState: function(state, user) {
            $rootScope.$apply(function() {
                switch (state) {
                    case 'success':
                        chatroomService.login(user);
                        break;
                }

            });
        }

    };

}]);

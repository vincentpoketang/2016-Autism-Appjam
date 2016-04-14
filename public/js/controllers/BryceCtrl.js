angular.module('BryceCtrl', []).controller('BryceController', function($scope, $http) {
                                           
    $scope.toggleDialogue = function() {
        $name = 'Bryce';
        $text = 'Hello ' + $name + '! Today I wanted to eat some of my apples, but I wanted to know how many I should eat.';

        $scope.showDialogue = true;
        $scope.showNext = true;
        $scope.showClose = false;
        $scope.dialogue = $text;
    };
                                           
    $scope.toggleQuestion = function() {
        $scope.dialogue = 'I bought 5 apples yesterday. If I eat 2 apples today, how many apples will I have left tomorrow?';
        $scope.showNext = false;
        $scope.showChoices = true;
    };
                                           
    $scope.toggleClose = function() {
        $scope.showDialogue = false;
        $scope.showChoices = false;
    };
                                           
    $scope.response = function(answer) {
        if (answer == 0) {
            $scope.dialogue = '1 apple? Hm that doesn\'t seem correct. Let me think, what is 5 minus 2...';
        } else if (answer == 1) {
            $scope.dialogue = '2 apples? Hm that doesn\'t seem correct. Let me think, what is 5 minus 2...';
        } else if (answer == 2) {
            $scope.dialogue = '3 apples? Yeah that\s right! Because 5 minus 2 is 3.';
            $scope.showChoices = false;
            $scope.showClose = true;
        } else if (answer == 3) {
            $scope.dialogue = '4 apples? Hm that doesn\'t seem correct. Let me think, what is 5 minus 2...';
        }
    }
                                           
});
angular.module('BryceCtrl', []).controller('BryceController', function($scope, $http) {
                                           
    $request = {
        method: 'GET',
        url: "http://localhost:3000/api/questions/571058e8b1b79aa3039716ba"
    };
                   
    $http($request)
        .success(function (data) {
            $type = data.type;
            $openingText = data.openingText;
            $questionText = data.questionText;
            $correctAnswer = data.correctAnswer;
            $response = data.response;
            $choices = data.choices;
        })
        .error(function (data) {
            console.log('ERROR: Could not retrieve questions.');
    });
                                           
    $scope.toggleDialogue = function() {
        $name = 'Bryce';
        $text = 'Hello ' + $name + '! ' + $openingText;

        $scope.showDialogue = true;
        $scope.showNext = true;
        $scope.showClose = false;
        $scope.dialogue = $text;
    };
                                           
    $scope.toggleQuestion = function() {
        $scope.dialogue = $questionText;
        $scope.showNext = false;
        if ($type == "MC") {
            $scope.choice1 = $choices[0];
            $scope.choice2 = $choices[1];
            $scope.choice3 = $choices[2];
            $scope.choice4 = $choices[3];
            $scope.showChoices = true;
        } else if ($type == "FR") {
            $scope.showEntry = true;
        }
        
    };
                                           
    $scope.toggleClose = function() {
        $scope.showDialogue = false;
        $scope.showChoices = false;
    };
                                           
    $scope.mcResponse = function(answer) {
        if (answer == 0) {
            $scope.dialogue = $response[0];
        } else if (answer == 1) {
            $scope.dialogue = $response[1];
        } else if (answer == 2) {
            $scope.dialogue = $response[2];
        } else if (answer == 3) {
            $scope.dialogue = $response[3];
        }
        if (answer == $correctAnswer) {
           $scope.showChoices = false;
           $scope.showClose = true;
        }
    }
                                           
    $scope.frResponse = function() {
        $scope.dialogue = $scope.answer + "? That's my favorite color too!";
        $scope.frAnswer = "";
        $scope.showEntry = false;
        $scope.showClose = true;
    }
                                           
});
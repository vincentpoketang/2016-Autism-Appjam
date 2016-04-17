angular.module('BryceCtrl', []).controller('BryceController', function($scope, $http) {
                  
    $scope.clickable = true;
                                           
    $scope.countDown = 10;
    setInterval(function(){
        console.log("Countdown: " + $scope.countDown);
        $scope.countDown--;
        $scope.$apply();
        if ($scope.countDown == 0 || $scope.showDialogue || $scope.clickable) {
            if ($scope.countDown == 0) {
                $scope.clickable = true;
            }
            $scope.countDown = 10;
        }
    }, 1000);
                                        
    $scope.toggleDialogue = function() {
        if (!$scope.clickable) {
            return;
        } else {
            $scope.clickable = false;
        }
        $request = {
            method: 'GET',
            url: "http://localhost:3000/api/questions/"
        };
        $http($request)
        .success(function (data) {
            // Get random question from database.
            $index = Math.floor(Math.random()*data.length);
            $type = data[$index].type;
            $openingText = data[$index].openingText;
            $questionText = data[$index].questionText;
            $correctAnswer = data[$index].correctAnswer;
            $response = data[$index].response;
            $choices = data[$index].choices;

            // Generate opening dialogue.
            $name = 'Bryce';
            $text = 'Hello ' + $name + '! ' + $openingText;
            $scope.showDialogue = true;
            $scope.showChoices = false;
            $scope.showNext = true;
            $scope.showClose = false;
            $scope.dialogue = $text;
        })
        .error(function (data) {
          console.log('Error: Could not connect to the database.');
        });
    };
                                           
    $scope.toggleQuestion = function() {
        // Generate random math problem.
        if ($type == "MA-" || $type == "MA+") {
            if ($type == "MA-") {
                $varX = Math.floor((Math.random() * 17) + 4);
                $varY = Math.floor((Math.random() * $varX+1));
                $maSolution = $varX - $varY;
            } else if ($type == "MA+") {
                $varX = Math.floor((Math.random() * 10));
                $varY = Math.floor((Math.random() * 10));
                $maSolution = $varX + $varY;
            }
            $choices = $generateRandomArray(4, 0, $maSolution);
            $questionText = $questionText.replace("?_X", $varX);
            $questionText = $questionText.replace("?_Y", $varY);
        }
        // Show choices and user input.
        if ($type == "MC" || $type == "MA-" || $type == "MA+") {
            $scope.choice1 = $choices[0];
            $scope.choice2 = $choices[1];
            $scope.choice3 = $choices[2];
            $scope.choice4 = $choices[3];
            $scope.showChoices = true;
        } else if ($type == "FR") {
            $scope.showEntry = true;
        }
        $scope.dialogue = $questionText;
        $scope.showNext = false;
    };
                                           
    $scope.toggleClose = function() {
        // Show close button.
        $scope.showDialogue = false;
        $scope.showChoices = false;
    };
                                           
    $scope.mcResponse = function(answer) {
        // Generate responses for multiple choice.
        if ($type == "MA-" || $type == "MA+") {
            if (answer == $choices.indexOf($maSolution)) {
                $res = $response[1].replace("?_X", $varX);
                $res = $res.replace("?_Y", $varY);
                $res = $res.replace("?_C", $maSolution);
                $scope.dialogue = $res;
                $scope.showChoices = false;
                $scope.showClose = true;
            } else {
                $res = $response[0].replace("?_X", $varX);
                $res = $res.replace("?_Y", $varY);
                $res = $res.replace("?_C", $choices[answer]);
                $scope.dialogue = $res;
            }
        } else if ($type == "MC") {
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
    }
                                           
    $scope.frResponse = function() {
        // Generate responses for free response.
        $response = $response[1].replace("?_C", $scope.frAnswer.toLowerCase());
        $scope.dialogue = $response;
        $scope.frAnswer = "";
        $scope.showEntry = false;
        $scope.showClose = true;
    }
                                           
    $generateRandomArray = function(n, min, max) {
        $numbers = new Array;
        $i = 0;
        while ($i < 3) {
            $newNumber = Math.floor(Math.random() * 20)
            // If the number is not already a choice and not the solution, insert it.
            if ($numbers.indexOf($newNumber) <= -1 && $newNumber != $maSolution) {
                $numbers[$i++] = $newNumber;
            }
        }
        // Add solution to choices and shuffle array.
        $numbers[3] = $maSolution;
        $numbers.sort(function() { return 0.5 - Math.random() });
        return $numbers;
    }
                                           
});
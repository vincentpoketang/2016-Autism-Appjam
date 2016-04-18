angular.module('BryceCtrl', []).controller('BryceController', function($scope, $http) {
           
    // Get user settings.
    $request = {
        method: 'GET',
        url: "http://localhost:3000/api/users/"
    };
    $http($request)
        .success(function (data) {
            console.log(data);
            $name = data.name;
            $correctMathAnswers = data.correctMathAnswers;
            $favorites = data.favorites;
        })
        .error(function (data) {
            console.log('Error: Could not retrieve user settings.');
        });
    }
                                           
    // Start music.
    $date = new Date();
    $hours = $date.getHours();
    if ($hours >= 5 && $hours <= 19) {
        $audio = new Audio("../audio/BubbleBuddyDay.mp3");
    } else {
        $audio = new Audio("../audio/BubbleBuddyNight.mp3");
    }
    $audio.loop = true;
    $audio.play();
                                           
    $scope.clickable = true;
            
    // Count down to next question/conversation.
    $scope.countDown = 10;
    setInterval(function(){
        $scope.countDown--;
        $scope.$apply();
        // Pause countdown if dialogue opens.
        if ($scope.countDown == 0 || $scope.showDialogue || $scope.clickable) {
            if ($scope.countDown == 0) {
                $scope.clickable = true;
            }
            $scope.countDown = 10;
        }
    }, 1000);
                                           
    $getQuestion = function() {
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
            $scope.showQuestion = true;
            $scope.showClose = false;
            $scope.dialogue = $text;
            })
        .error(function (data) {
              console.log('Error: Could not retrieve questions.');
          });
    }
                                           
    $getConversation = function() {
        $request = {
            method: 'GET',
            url: "http://localhost:3000/api/conversations/"
        };
        $http($request)
        .success(function (data) {
            // Get random conversation from database.
            $index = Math.floor(Math.random()*data.length);
            $type = data[$index].type;
            $mood = data[$index].mood;
            $time = data[$index].time;
            $conversation = data[$index].text;

            $scope.showDialogue = true;
            $scope.showChoices = false;
            $scope.showConversation = true;
            $scope.showClose = false;
            $conversationIndex = 0;
            $scope.dialogue = $conversation[$conversationIndex];
        })
        .error(function (data) {
              console.log('Error: Could not retrieve conversations.');
        });
    }
                                        
    $scope.toggleDialogue = function() {
        if ($scope.clickable) {
            $scope.clickable = false;
            $retrieve = Math.floor(Math.random()*2);
            if ($retrieve == 0) {
                $getQuestion();
            } else {
               $getConversation();
            }
        }
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
        $scope.showQuestion = false;
    };
                                           
    $scope.toggleConversation = function() {
        // Move on to next part of conversation.
        if ($conversationIndex == $conversation.length-2) {
            $scope.showConversation = false;
            $scope.showClose = true;
        }
        $scope.dialogue = $conversation[++$conversationIndex];
    }
                                           
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
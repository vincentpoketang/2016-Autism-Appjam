angular.module('ArzangCtrl', []).controller('ArzangController', function($scope, $http) {

    ////////////////////////////////
    // STARTING SCRIPT
    ///////////////////////////////

    $request = {
        method: 'GET',
        url: "http://localhost:3000/api/users/"
    };
    $http($request)
        .success(function (data) {
            if (data.length == 0) {
                $type = "FR";
                $openingText = "Hello!";
                $questionText = "What is your name?";
                $response = { "0" : "",
                    "1" : "Cool!",
                    "2" : "",
                    "3" : "" };
                $dataLoad = "NEW_USER";
                $scope.showDialogue = true;
                $scope.showChoices = false;
                $scope.showQuestion = true;
                $scope.showClose = false;
                $scope.dialogue = $openingText;
            } else {
                $userID = data[0]._id;
                $userName = data[0].name;
                $userData = data[0].data;
            }
        })
        .error(function (data) {
            console.log('Error: Could not retrieve user settings.');
        });

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


    ////////////////////////////////
    // DIALOGUE METHODS
    ///////////////////////////////

    $scope.toggleDialogue = function() {
        if ($scope.clickable) {
            $scope.clickable = false;
            $retrieve = Math.floor(Math.random()*2);
            if ($retrieve == 0) {
                // $getQuestion();
                $getConversation();
            } else {
                // $getQuestion();
                $getConversation();
            }
        }
    };

    $scope.toggleClose = function() {
        // Show close button.
        $scope.showDialogue = false;
        $scope.showChoices = false;
    };


    ////////////////////////////////
    // QUESTION METHODS
    ///////////////////////////////

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
                $dataLoad = data[$index].dataLoad;

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


    ////////////////////////////////
    // CONVERSATION METHODS
    ///////////////////////////////

    $getConversation = function() {
        $request = {
            method: 'GET',
            url: "http://localhost:3000/api/conversations/"
        };
        $http($request)
            .success(function (data) {
                // Get random conversation from database.
                while (true) {
                    $index = Math.floor(Math.random() * data.length);
                    $type = data[$index].type;
                    $mood = data[$index].mood;
                    $time = data[$index].time;
                    $property = data[$index].property;
                    $conversation = data[$index].text;
                    if (data[$index]._id == "571714ea42ee0cfc1adea033") {
                        if ($property == null || $userData.hasOwnProperty($property)) {
                            break;
                        }
                    }
                }
                $scope.showDialogue = true;
                $scope.showChoices = false;
                $scope.showConversation = true;
                $scope.showClose = false;
                $conversationIndex = -1;
                $scope.toggleConversation();
            })
            .error(function (data) {
                console.log('Error: Could not retrieve conversations.');
            });
    }

    $scope.toggleConversation = function() {
        // Move on to next part of conversation.

        if ($conversationIndex + 1 >= $conversation.length) { // + 1 because of the ++ to conversationIndex below
            $scope.toggleClose();
            return;
        }
        if ($conversationIndex == $conversation.length-2) {
            // Switch the "Next" button to the "Close" button
            $scope.showConversation = false;
            $scope.showClose = true;
        }

        // Iterate to next line.
        $c = $conversation[++$conversationIndex];

        if ($c.startsWith("Respond-")){
            // take a text response and identify it's sentiment.
            // branch

            $scope.showResponse = true;
            $scope.showConversation = false;

            $branchIndexes = $conversation[$conversationIndex].match(/\d+/g);

            // console.log($branchIndexes);

            $positiveIndex = $branchIndexes[0] - 1; // -1 because of the ++ to conversationIndex above
            $negativeIndex = $branchIndexes[1] - 1; // -1 because of the ++ to conversationIndex above
        }
        else if ($c.startsWith("Jump-")) {
            $destiniationIndex = $c.match(/\d+/g)[0] - 1; // -1 because of the ++ to conversationIndex above
            $conversationIndex = $destiniationIndex;

            // console.log($conversationIndex);

            $scope.toggleConversation();
        }
        else if ($c.includes("?_")) {
            // Check if there are any variables needed to be replaced.

            $replace = $c.match(/\?_\w+/g);
            $scope.dialogue = $c.replace($replace, $userData[$property]);
        } else {
            $scope.dialogue = $c;
        }
    }

    $scope.handleConvoResponse = function() {
        // Generate responses for free response.
        $response = $scope.convoResponse.toLowerCase();
        $scope.convoResponse = "";
        $scope.showResponse = false;
        $scope.showConversation = true;

        // var testSenti = sentiment("Cats are the most amazing animals ever.");
        $branch = Math.floor(Math.random() * 2);
        if ($branch < 2) {
            $conversationIndex = $negativeIndex;
        }
        else {
            $conversationIndex = $positiveIndex;
        }

        $scope.toggleConversation();
    };

    ////////////////////////////////
    // RESPONSE METHODS
    ///////////////////////////////

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
                $load($dataLoad, $userData["correctMathAnswers"] + 1);
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
        $scope.showEntry = false;
        $scope.showClose = true;
        if ($dataLoad != null && $dataLoad != "NEW_USER") {
            $load($dataLoad, $scope.frAnswer.toLowerCase());
        } else if ($dataLoad == "NEW_USER") {
            $createNewUser();
        }
    }


    ////////////////////////////////
    // HELPER METHODS
    ///////////////////////////////

    $createNewUser = function() {
        $request = {
            method: 'POST',
            url: "http://localhost:3000/api/users/",
            data: { name: $scope.frAnswer,
                data: {correctMathAnswers: 0} }
        };
        $http($request)
            .success(function (data) {
                $userID = data._id;
                $userName = data.name;
                $userData = data.data;
                console.log('Created new user "' + $scope.frAnswer + '".');
                $scope.frAnswer = "";
            })
            .error(function (data) {
                console.log('Error: Could not modify user settings.');
            });
    }

    $load = function(property, value) {
        $userData[property] = value;
        $scope.frAnswer = "";
        $request = {
            method: 'PUT',
            url: "http://localhost:3000/api/users/" + $userID,
            data: {data: $userData}
        };
        $http($request)
            .success(function (data) {
                console.log('Updated user setting "' + property + '" to "' + value + '".');
            })
            .error(function (data) {
                console.log('Error: Could not modify user settings.');
            });
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
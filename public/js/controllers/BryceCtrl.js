angular.module('BryceCtrl', []).controller('BryceController', function($scope, $http) {
        
    //Declare :)
    $type = "";
    $openingText = "";
    $questionText = "";
    $correctAnswer = "";
    $response = "";
    $choices = "";
                                           
    $getQuestion = function(id) {
        $request = {
            method: 'GET',
            url: "http://localhost:3000/api/questions/" + id
        };
        $http($request)
        .success(function (data) {
            $type = data.type;
            $openingText = data.openingText;
            $questionText = data.questionText;
            $correctAnswer = data.correctAnswer;
            $response = data.response;
            $choices = data.choices;
                 
            $name = 'Bryce';
            $text = 'Hello ' + $name + '! ' + $openingText;
            $scope.showDialogue = true;
            $scope.showChoices = false;
            $scope.showNext = true;
            $scope.showClose = false;
            $scope.dialogue = $text;
        })
        .error(function (data) {
          console.log('Error: Could not retrieve question.');
        });

    }
                                           
    $scope.toggleDialogue = function() {
        $questions = ["5711330118b9db3d0329f7d1", "5711941d0600fef1035a7d9d", "571194d90600fef1035a7d9e"];
        $id = $questions[Math.floor(Math.random()*$questions.length)];
        $getQuestion($id);
    };
                                           
    $scope.toggleQuestion = function() {
        if ($type == "MA") {
            $varX = Math.floor((Math.random() * 17) + 4);
            $varY = Math.floor((Math.random() * $varX+1));
            $maSolution = $varX - $varY;
            $choices = $generateRandomArray(4, 0, $maSolution);
            $questionText = $questionText.replace("?_X", $varX);
            $questionText = $questionText.replace("?_Y", $varY);
        }
        if ($type == "MC" || $type == "MA") {
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
        $scope.showDialogue = false;
        $scope.showChoices = false;
    };
                                           
    $scope.mcResponse = function(answer) {
                                           console.log
        if ($type == "MA") {
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
            if ($numbers.indexOf($newNumber) <= -1 && $newNumber != $maSolution) {
                $numbers[$i++] = $newNumber;
            }
        }
        $numbers[3] = $maSolution;
        $numbers.sort(function() { return 0.5 - Math.random() });
        return $numbers;
    }
                                           
});
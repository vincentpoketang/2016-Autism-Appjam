angular.module('ArzangCtrl', []).controller('ArzangController', function($scope, $http) {

    $request = {
        method: 'GET',
        url: "http://localhost:3000/api/questions/57104d4ca768a0c8218b9395"
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
		
	var sending_data = {
        type : "MA",
        openingText: "aaaa",
        questionText: "aaaaaaaaaa",
        choices:["a", "2", "4", "3"],
        correctAnswer: 3,
        response:{
            0: "a",
            1: "a",
            2: "a",
            3: "a"
        }
	};
		
	$post = {
		method: "POST",
		url: "http://localhost:3000/api/questions",
		data: sending_data
	};
	
	$http($post)
		.success(function (data) {
			console.log("SUCCESS: test post please ignore");
            console.log(data);

		})
		.error(function () {
			console.log("ERROR: test post failed. fml");
		})

    $scope.toggleDialogue = function() {
        $name = 'Arzang';
        $text = 'Hello ' + $name + '! ' + $openingText;

        $scope.showDialogue = true;
        $scope.showNext = true;
        $scope.showClose = false;
        $scope.dialogue = $text;
    };

    $scope.toggleQuestion = function() {
        $scope.dialogue = $questionText;
        $scope.showNext = false;
        $scope.choice1 = $choices[0];
        $scope.choice2 = $choices[1];
        $scope.choice3 = $choices[2];
        $scope.choice4 = $choices[3];
        $scope.showChoices = true;
    };

    $scope.toggleClose = function() {
        $scope.showDialogue = false;
        $scope.showChoices = false;
    };

    $scope.response = function(answer) {
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

});
angular.module('BryceCtrl', []).controller('BryceController', function($scope, $http) {

	$scope.tagline = 'WHY ARENT MY AJAX CALLS WORKING';
	$scope.showQuestion = false;

    $scope.answers = [{text:"Good",checked: false},
        {text:"Sad",checked:false},
        {text:"Weird",checked:false},
        {text:"Okay",checked:false}];

    $scope.bubbleText = "Hello There!"
    $scope.currentAnswer = "";
    $scope.response = "";
	$scope.changeTagline= function() {
		var request = {
			method: 'GET',
			url: "http://localhost:3000/api/users/570ded693cf35fa715db7262"
		};
		$http(request).
		success(function (data) {
			$scope.tagline = data.name;
		}).error(function (data) {
			console.log('ERROR: Could not find user');
		});
	};

	$scope.toggleQuestion = function() {
		$scope.showQuestion = true;
        $scope.bubbleText = "How are you feeling today?"
	};

    $scope.respond = function(answer) {
        if ($scope.currentAnswer == "Good")
            $scope.bubbleText = "I'm feeling great as well!";
        else if ($scope.currentAnswer == "Sad")
            $scope.bubbleText = "Awwwww...why are you sad? :(";
        else if ($scope.currentAnswer == "Weird")
            $scope.bubbleText = "Today does feel a bit strange...";
        else if ($scope.currentAnswer == "Okay")
            $scope.bubbleText = "Ok.";
        else
            $scope.bubbleText = "I don't quite understand.";
    };

    $scope.updateSelection = function(position, answers) {
        angular.forEach(answers, function(answer, index) {
            if(position != index)
                answer.checked = false;
        })
    }

    $scope.changeCurrent = function(answer) {
        $scope.currentAnswer = answer.text;
    }
});
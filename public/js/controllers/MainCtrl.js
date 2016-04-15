angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

    //totalApples is 4-20
    var totalApples = Math.floor((Math.random() * 17) + 4);
    //eatenApples is 0-totalApples
    var eatenApples = Math.floor((Math.random() * totalApples+1));
    //correct answer is:
    var correctAnswer = totalApples - eatenApples;


    // RETURNS PSEUDO-RANDOM NUMBER IN RANGE min...max
    function random_number(min,max) {

        return (Math.round((max-min) * Math.random() + min));
    }

    // CREATE AND FILL NUMBER ARRAY WITH UNIQUE RANDOM NUMBERS between 0-20 and one is the correct answer
    var myNumArray = create_unique_random_array(4,0,totalApples);

    function create_unique_random_array(num_elements,min,max) {

        var temp, nums = new Array;

        for (var element=0; element<num_elements; element++) {

            //IMPORTANT: DON'T FORGET THE SEMI-COLON AT THE END
            while((temp=number_found(random_number(min,max),nums))==-1);
            nums[element] = temp;
        }
        if (nums.indexOf(correctAnswer) == -1) {
            nums[Math.floor((Math.random()*4))] = correctAnswer;
        }
        return (nums);
    }

    function number_found (random_number,number_array) {

        for (var element=0; element<number_array.length; element++) {

            if (random_number==number_array[element]) {
                return (-1);
            }
        }

        return (random_number);
    }

    $request = {
        method: 'GET',
        url: "http://localhost:3000/api/questions/57103f05d10274e811ae55bd"
    };

    $http($request)
        .success(function (data) {
            $type = data.type;
            $openingText = data.openingText;
            $questionText = "I bought "+totalApples +" apples yesterday. If I eat "+eatenApples +" apples today, how many apples will I have left tomorrow?";
            $correctAnswer = correctAnswer;
            $response = data.response;
            $choices = myNumArray;
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
        if (answer == myNumArray.indexOf(correctAnswer)) {
            $scope.dialogue = "correct";
            $scope.showChoices = false;
            $scope.showClose = true;
        }
        else{
            $scope.dialogue = "wrong";
        }
    }

    $scope.frResponse = function() {
        $scope.dialogue = $scope.answer + "? That's my favorite color too!";
        $scope.frAnswer = "";
        $scope.showEntry = false;
        $scope.showClose = true;
    }

});
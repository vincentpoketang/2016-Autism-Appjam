/**
 * Created by Dooshkukakoo on 4/13/2016.
 */
// grab the mongoose module
var mongoose = require('mongoose');

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Question', {
    type : {type : String, enum: ["MC","FR"]},
    openingText: {type : String},
    questionText: {type : String},
    choices:[],
    correctAnswer: Number,
    response:{
        0: String,
        1: String,
        2: String,
        3: String
    }
});

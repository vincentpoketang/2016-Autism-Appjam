// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
	name : {type : String},
    lastLogin: Date,
	data: Object
});

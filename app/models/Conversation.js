var mongoose = require('mongoose');

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Conversation', {
    mood : String,
    time: String,
    text : []
});
var User = require('./models/user');
var Question = require('./models/question');
var mongoose = require('mongoose');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
    // sample api route
    app.get('/api/users', function(req, res) {
        // use mongoose to get all users in the database
        User.find(function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    app.get('/api/users/:userId', function(req, res) {
        // use mongoose to get all users in the database
        User.findById(req.params.userId, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    app.post('/api/users', function(req, res) {
        // use mongoose to get all users in the database
        var newId = mongoose.Types.ObjectId();
        var newUser = {
            _id: newId,
            name: req.body.name
        };
        User.create(newUser, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    app.put('/api/users/:userId', function(req, res) {
        // use mongoose to get all users in the database
        var updatedUser = {
            name: req.body.name
        };
        User.findByIdAndUpdate(req.params.userId, updatedUser, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    // sample api route
    app.delete('/api/users/:userId', function(req, res) {
        // use mongoose to get all users in the database
        User.findByIdAndRemove(req.params.userId, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    //Question routes
    app.get('/api/questions', function(req, res) {
        // use mongoose to get all users in the database
        Question.find(function(err, questions) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(questions); // return all users in JSON format
        });
    });

    app.get('/api/questions/:questionId', function(req, res) {
        // use mongoose to get all users in the database
        Question.findById(req.params.questionId, function(err, question) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(question); // return all users in JSON format
        });
    });

    app.post('/api/questions', function(req, res) {
        // use mongoose to get all users in the database
        Question.create(req.body, function(err, question) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(question); // return all users in JSON format
        });
    });

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
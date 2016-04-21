var User = require('./models/user');
var Question = require('./models/question');
var Conversation = require('./models/conversation');
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

    app.get('/api/users/:userid', function(req, res) {
        // use mongoose to get all users in the database
        User.findOne(req.params.userid, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            res.json(users); // return all users in JSON format
        });
    });

    app.post('/api/users', function(req, res) {
        // use mongoose to get all users in the database
        User.create(req.body, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    app.post('/api/users/multiple', function(req, res) {
        // use mongoose to get all users in the database
        User.collection.insert(req.body, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    app.put('/api/users/:userid', function(req, res) {
        // use mongoose to get all users in the database
        User.findOneAndUpdate(req.params.userid, req.body, function(err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    // sample api route
    app.delete('/api/users/:userid', function(req, res) {
        // use mongoose to get all users in the database
        User.findOneAndRemove(req.params.userid, function(err, users) {

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

    app.get('/api/questions/MC', function(req, res) {
        // use mongoose to get all users in the database
        Question.find({'type': 'MC'},function(err, questions) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(questions); // return all users in JSON format
        });
    });

    app.get('/api/questions/FR', function(req, res) {
        // use mongoose to get all users in the database
        Question.find({'type': 'FR'},function(err, questions) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(questions); // return all users in JSON format
        });
    });

    app.get('/api/questions/:questionid', function(req, res) {
        // use mongoose to get all users in the database
        Question.findOne(req.params.questionid, function(err, question) {

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

            res.json(question); // return all questions in JSON format
        });
    });

    app.post('/api/questions/multiple', function(req, res) {
        // use mongoose to get all users in the database
        Question.collection.insert(req.body, function(err, question) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(question); // return all questions in JSON format
        });
    });

    app.get('/api/conversations', function(req, res) {
        // use mongoose to get all users in the database
        Conversation.find(function(err, conversations) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(conversations); // return all users in JSON format
        });
    });
	
	// Conversation Routes
	app.post('/api/conversations', function(req, res) {
        // use mongoose to get all users in the database
        Conversation.create(req.body, function(err, conversation) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            console.log("pew");
            res.json(conversation); // return all conversations in JSON format
        });
    });

    app.post('/api/conversations/multiple', function(req, res) {
        // use mongoose to get all users in the database
        Conversation.collection.insert(req.body, function(err, conversation) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(conversation); // return all questions in JSON format
        });
    });

    app.get('/api/conversations/:mood/:time', function(req, res) {
        // use mongoose to get all users in the database
        Conversation.find({$or: [ {$and: [{ mood: req.params.mood  }, { time: req.params.time }]}, {$and: [{ mood: 'neutral'  }, { time: 'neutral' }]}, {$and: [{ mood: req.params.mood  }, { time: 'neutral' }]}, {$and: [{ mood: 'neutral'  }, { time: req.params.time }]}]},function(err, conversations) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(conversations); // return all users in JSON format
        });
    });

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};
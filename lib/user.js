// User Profile
//	version: Primitive
// This version of the user profile is to focus on the MVC aspect of
// AngularJS interacting with a mongodb via mongoose.
// This example lacks amongst other things error checking, validation and recovery.
// Anotherwords, this is not designed for operational use.

// We need to first connect to the database.
// This connection is local to the routines.  We do not 
// need to expose them to the calling module.

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/test');  

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

// We are now going to create a module.  To do this we create an empty 
// funciton.  We are then going to treat it like a hash and add 
// functions onto it.  Finally, we expose this collection of functions
// via the 'module.exports' command.

var userProfile = function() {};

// Let's define the human schema
// for clarity sake I seperate it from the call.

  humanJsonSchema = { humanName: String,
	  systemName: String,
	  email: String,
	  password: String,
	  role: { type: String, default: 'user' },
	  lastLogin: { type: Date, default: Date.now },
	  active: { type: Boolean, default: true},
	  joinDate: { type: Date, default: Date.now }};
  
  var humanSchema = mongoose.Schema(humanJsonSchema);
  var Human = mongoose.model('Human', humanSchema);
  
  
  userProfile.saveUser = function(req, res) {

    var role = req.body.role || "user";
	var humanName = req.body.firstName +" "+req.body.lastName;
	
	var insertResult = new Human({ 
		  humanName: humanName
		, systemName: req.body.systemName
		, email: req.body.email
		, role : role
		, password: req.body.password })
		.save(function(err, result) {
		    if (err) {
		      res.send(500, { error: "database error:" + err });
		      return;
		    }
		    res.send(200, result);
		})
  };
  
  userProfile.list = function(reg, res) {
	
	Human.find(function(err, result) {
	    if (err) {
	      res.send(500, { error: "database error:" + err });
	      return;
		}
	    res.send(200, result);	
	})
  }
  
module.exports = userProfile;
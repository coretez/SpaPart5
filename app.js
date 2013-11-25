/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

/*
 * Configure the app without Jade or Views.
 * We are going to leverage the Public directory to deliver the SPA
 * We are still going to use routes, but for handle REST calls.
 */

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  app.enable("jsonp callback");
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var userProfile = require('./lib/user.js');
app.post('/user/signup', userProfile.saveUser);
app.get('/admin/user', userProfile.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

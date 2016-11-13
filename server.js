/**
 * Created by mudasir on 11/11/16.
 */
// modules =================================================
var express        = require('express');
var app            = express();
var cookieParser = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mysql      = require('mysql');
var http = require('http');
var fs = require('fs');
// configuration ===========================================

// config files

var port = process.env.PORT || 8080; // set our port

//Database Connection

var connection = mysql.createConnection({
    host     : 'box6172.bluehost.com',
    user     : 'edifycon_api',
    password : 't+aZ6*5+j%+',
    database : 'edifycon_c24eng',
    port : "3306"
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
app.db_connection = connection;
// get all data/stuff of the body (POST) parameters
app.use(cookieParser());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

// routes ==================================================
require('./app/controllers')(app);
require('./app/routes')(app);
// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
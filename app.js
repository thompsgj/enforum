var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//DB line goes here
var uglifyJs = require("uglify-js");
var fs = require('fs');

//var routes = require('./app_server/routes/index');
//Uncomment out this line later

//DATABASE CONNECTION
var monk = require('monk');
var db = monk('localhost:27017/enforum');
//

var routesApi = require('./app_api/routes/index');
var server = require('./app_server/routes/index');

/*
var handlebars = require('express-handlebars').create({
	defaultLayout:'main',
	//necessary for injecting views into layouts when desired
	helpers: {
		section: function(name, options) {
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		},
		messageAlert: function(val) {
			if(val == "success") {
				return "alert alert-success"
			} else {
				return "alert alert-danger"
			}
		}
	}
});
*/



var app = express();

//app.engine('handlebars', handlebars.engine);
//app.set('view engine', 'handlebars');
//app.set('port', process.env.PORT || 3000);

var appClientFiles = [
	'app_client/app.js',
	'app_client/home/home.controller.js',
	'app_client/postList/postList.controller.js',
	'app_client/postRetrieve/postRetrieve.controller.js',
	'app_client/postModal/postModal.controller.js',
	//'app_client/replyModal/replyModal.controller.js',
	'app_client/settingsModal/settingsModal.controller.js',
	'app_client/editForumModal/editForumSettingsModal.controller.js',
	'app_client/reflectionSettingsModal/reflectionSettingsModal.controller.js',
	'app_client/common/directives/navigation/navigation.directive.js',
	'app_client/common/services/enForumData.service.js'
];
var uglified = uglifyJs.minify(appClientFiles, {compress : false});


fs.writeFile('public/angular/enforum.min.js', uglified.code, function (err) {
	if(err) {
		console.log("Write Uglified File ERROR")
		console.log(err);
	} else {
		console.log("Script generated and saved:", 'enforum.min.js');
	}
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', routes)
app.use('/api', routesApi);


app.use(function(req,res) {
	res.sendfile(path.join(__dirname, 'app_client','index.html'));
});

/*Error Handling*/
//custom 404 page
/*
app.use(function(req,res) {
	res.status(404);
	res.render('404');
});
*/
//custom 500 page
/*
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});
*/
/*
app.listen(app.get('port'), function() {
	console.log( 'Express started on http:localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})
*/
module.exports = app;
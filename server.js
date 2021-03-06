var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');


var application_controller = require('./controllers/application_controller.js');
var recipes_controller = require('./controllers/recipe_controller.js');
var search_controller = require('./controllers/search_controller.js');
var users_controller = require('./controllers/users_controller.js');
var payment_controller = require('./controllers/payment_controller.js');
var recipebook_controller = require('./controllers/recipebook_controller.js');

var app = express();

app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(session({ secret: 'no keyboard cat', cookie: { maxAge: null }, resave: true, saveUninitialized: true}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', application_controller);
app.use('/search', search_controller);
app.use('/user', users_controller);
app.use('/recipe', recipes_controller);
app.use('/payment', payment_controller);
app.use('/recipebook', recipebook_controller);

var sequelize = require("sequelize");
var models = require("./models");

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function(){
	var server = app.listen(app.get('port'), function() {
		console.log("Express server listening on port " + server.address().port);
	});
});
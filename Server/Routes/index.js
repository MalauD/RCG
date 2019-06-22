var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var db = require('./../Db/Db');
var bodyParser = require('body-parser');

const app = (module.exports = require('express')());
var express = require('express');

var options = {
	clearExpired: true,
	checkExpirationInterval: 900000,
	expiration: 86400000,
	endConnectionOnClose: true,
	createDatabaseTable: true,
	schema: {
		tableName: 'UserSessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
};

var sessionStore = new MySQLStore(options, db);

app.use(
	session({
		key: 'RCG Login Cookie',
		secret:
			'380980b2abba5eadd6215eff8b970cd15341566af16febf6ff9bde87ae2825db',
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true }
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile('/home/pi/RCGWebsite/Public/index.html');
});

app.use(express.static('/home/pi/RCGWebsite/Public/'));

app.use('/Meals', require('./Meals'));
app.use('/Ingredients', require('./Ingredients'));
app.use('/Auth', require('./Auth'));
app.use('/Account', require('./Account'));
app.use('/Admin', require('./Admin'));

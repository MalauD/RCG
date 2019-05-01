var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var https = require('https');
var session = require('express-session');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const sqlquery = require('./Server/mysql_query.js');
const DBUsers = require('./Server/Authentification/mysql_query_users.js');
const VerifCredentials = require('./Server/Authentification/Verifications.js');

const Authentification = require('./Server/Authentification/Authentification.js');

var key = fs.readFileSync('Encryption/key.pem');
var cert = fs.readFileSync('Encryption/cert.pem');

var options = {
	key: key,
	cert: cert,
	passphrase: 'rcgestlemeilleurdessitesweb'
};

var Queries = new sqlquery();

app.use(
	session({
		key: 'RCG Login Cookie',
		secret: '380980b2abba5eadd6215eff8b970cd15341566af16febf6ff9bde87ae2825db',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true }
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/Public'));

app.get('/foods/name/:id', (req, res) => {
	Queries.RequestFoodsByName(req.params.id, (err, result) => {
		if (err) {
			res.sendStatus(500);
			res.end();
		} else res.json(result);
	});
});

app.get('/foods/id/:id', (req, res) => {
	if (req.params.id != 'undefined')
		Queries.QueryDBForFoodByID(req.params.id, (Failed, result) => {
			if (Failed) {
				res.sendStatus(500);
				res.end();
			} else res.json(result);
		});
});

app.get('/Account', (req, res) => {
	if (req.session.name) res.sendFile(__dirname + '/Public/Views/Account.html');
	else res.redirect('/Login');
});

app.get('/Account/User/Name', (req, res) => {
	if (req.session.name) res.json({ Name: req.session.name });
	else res.sendStatus(403);
});

app.get('/Account/User', (req, res) => {
	if (req.session.name) res.json({ Name: req.session.name, Mail: req.session.mail });
	else res.sendStatus(403);
});

app.get('/Signup', (req, res) => {
	if (req.session.name) res.redirect('/');
	else res.sendFile(__dirname + '/Public/Views/SignUp.html');
});

app.post('/Signup', (req, res) => {
	//Check if user already logged in
	if (req.session.name) res.sendStatus(201);
	else {
		Authentification.SignupUser(req, res, Queries, User => {
			console.log('[Session] Saving user in Session');
			req.session.name = User.Name;
			req.session.mail = User.Mail;
			//Save hash of the password
			req.session.hash = User.Hash;
			console.log('[Session] User save in Session');
			//send a Created (201) to the client
			res.sendStatus(201);
		});
	}
});

app.get('/Login', (req, res) => {
	//if (req.session.name) res.redirect('/');
	//else res.sendFile(__dirname + '/Public/Views/Login.html');
	res.end();
});

// TODO Optimize : current(628ms)
app.post('/Login', (req, res) => {
	//Check if user already logged in
	if (req.session.name) res.sendStatus(201);
	else {
		Authentification.LoginUser(req, res, Queries, User => {
			console.log('[Session] Saving user in Session');
			req.session.name = User.Name;
			req.session.mail = User.Mail;
			//Save hash of the password
			req.session.hash = User.Hash;
			console.log('[Session] User save in Session');
			//send a Created (201) to the client
			res.sendStatus(201);
		});
	}
});

app.get('/Logout', (req, res) => {
	//Clear session data and redirect
	console.log('[Session] Client request a logout');
	req.session.destroy();
	console.log('[Session] Session destroyed redirecting...');
	res.redirect('/');
});

app.get('/Contributions', (req, res) => {
	if (req.session.name) res.sendFile(__dirname + '/Public/Views/Contributions.html');
	else res.redirect('/');
});

https.createServer(options, app).listen(8080);

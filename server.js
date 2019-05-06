var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var https = require('https');
var session = require('express-session');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var multer = require('multer');
var uuid = require('uuid');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, __dirname + '/Public/FoodImage/');
	},
	filename: function(req, file, callback) {
		callback(null, uuid.v4() + file.originalname);
	}
});

function fileFilter(req, file, cb) {
	var ext = path.extname(file.originalname);
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return cb(new Error('File is not an image'));
	}
	cb(null, true);
}

var upload = multer({
	fileFilter,
	storage,
	limits: {
		fileSize: 1024 * 1024
	}
});

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

app.get('/foods/unchecked', (req, res) => {
	if (req.session.name)
		Queries.QueryDBForFoodUnchecked((Failed, result) => {
			if (Failed) {
				res.sendStatus(500);
				res.end();
			} else res.json(result);
		});
});

app.get('/Account/User/Name', (req, res) => {
	if (req.session.name) res.json({ Name: req.session.name });
	else res.sendStatus(403);
});

app.get('/Account/User', (req, res) => {
	if (req.session.name) res.json({ Name: req.session.name, Mail: req.session.mail, Rank: req.session.Rank });
	else res.sendStatus(403);
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
			if (!User.rank) User.rank = 0;
			req.session.Rank = User.Rank;
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

app.post('/Create', upload.single('ImageFile'), (req, res) => {
	VerifCredentials.CreateFormShem.validate(req.body)
		.then(() => {
			if (req.file && req.session.name) {
				console.log('[Create - Food] Got a new food submit');
				console.log('[Create - Food]  Name:' + req.body.Name);
				console.log('[Create - Food]  RCG:' + req.body.RCG);
				console.log('[Create - Food] Image saved as ' + req.file.filename);
				let FoodImageLink = '/FoodImage/' + req.file.filename;
				console.log('[Create - Food] Image saved in ' + FoodImageLink);
				Queries.AddFoodToPendingDB(req.body, req.session.hash, FoodImageLink, err => {
					if (err) {
						res.json({ CreateStatus: false });
						console.log(err);
						return;
					}
					res.json({ CreateStatus: true });
					return;
				});
			}
			res.json({ CreateStatus: false });
		})
		.catch(err => {
			console.log('[Create - Food] Error ' + err.errors);
		});
});

https.createServer(options, app).listen(8080);

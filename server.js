var express = require('express');
const RCGTitle = require('./Server/RCGTitle');
var app = express();
var path = require('path');
var fs = require('fs');
var http = require('http');
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
const FoodList = require('./Server/mysql_query_foodslist');
const Authentification = require('./Server/Authentification/Authentification.js');
const UserVerification = require('./Server/UserVerifications/UserStateVerification.js');

var key = fs.readFileSync('Encryption/key.pem');
var cert = fs.readFileSync('Encryption/cert.pem');

var options = {
	key: key,
	cert: cert,
	passphrase: 'rcgestlemeilleurdessitesweb'
};

RCGTitle.Say();
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

app.get('/foodslist/id/:id', (req, res) => {
	if (req.params.id) {
		FoodList.GetFoodItemById(req.params.id, Queries.connection, (err, resp) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				res.end();
				return;
			}
			res.json(resp);
		});
		return;
	}
	res.sendStatus(500);
});

app.get('/foodslist/name/:name', (req, res) => {
	if (req.params.name) {
		FoodList.GetFoodItemByName(req.params.name, 5, Queries.connection, (err, resp) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				res.end();
				return;
			}
			res.json(resp);
		});
		return;
	}
	res.sendStatus(500);
});

app.get('/foodslist/Group/:name', (req, res) => {
	if (req.params.name) {
		FoodList.GetFoodsItemByGroup(req.params.name, Queries.connection, (err, resp) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				res.end();
				return;
			}
			res.json(resp);
		});
		return;
	}
	res.sendStatus(500);
});

app.get('/foodslist/SubGroup/:name', (req, res) => {
	if (req.params.name) {
		FoodList.GetFoodsItemBySubGroup(req.params.name, Queries.connection, (err, resp) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
				res.end();
				return;
			}
			res.json(resp);
		});
		return;
	}
	res.sendStatus(500);
});

app.get('/foods/name/:id', (req, res) => {
	Queries.RequestFoodsByName(req.params.id, (err, result) => {
		if (err) {
			res.sendStatus(500);
			res.end();
		} else res.json(result);
	});
});

app.get('/foods/trending/rcg/', (req, res) => {
	Queries.GetBestRCGMeal(4, (err, result) => {
		if (err) {
			res.sendStatus(500);
			res.end();
		} else res.json(result);
	});
});

app.get('/foods/id/:id', (req, res) => {
	if (req.params.id != 'undefined') {
		//if the food requested is unchecked, see if the rank is ok to acces this data if not send 500
		if (
			req.query.Checked == 'false' &&
			!UserVerification.IsUserAnAdmin({ name: req.session.name, Rank: req.session.Rank })
		) {
			res.sendStatus(500);
			return;
		}

		Queries.QueryDBForFoodByID(req.params.id, req.query.Checked, (Failed, result) => {
			if (Failed) {
				res.sendStatus(500);
				res.end();
			} else res.json(result);
		});
	} else {
		res.sendStatus(500);
	}
});

app.post('/foods/vote/', (req, res) => {
	if (req.params.id != 'undefined') {
		//Verify if the user is allowed to perform this action
		if (!req.session.name) {
			res.json({ error: 'User not logged' }).sendStatus(500);
			return;
		}
		//TODO verif vote using YUP
		//verify if the vote already exist
		Authentification.CheckVoteExisting(
			req.session.hash,
			req.body.vote,
			Queries.connection,
			(err, IsExisting, VoteDB, votesarray) => {
				if (err) {
					console.log(err);
					res.sendStatus(500);
					return;
				}
				//if the vote exist send it to the client
				if (IsExisting) res.json({ error: VoteDB, IsExisting }).sendStatus(500);
				else {
					//if aray is empty create it
					if (!votesarray) votesarray = [];

					votesarray.push(req.body.vote);
					//Add element to array and the put it in DB
					Authentification.AddVotesToDB(votesarray, req.session.hash, Queries.connection, err => {
						if (err) {
							console.log(err);
							res.json({ error: 'Error when appending vote' }).sendStatus(500);
						}
						res.sendStatus(200);
						return;
					});
				}
			}
		);
	}
});

app.post('/foods/admin/delete/:id', (req, res) => {
	//verify if id isnt empty
	if (req.params.id != 'undefined') {
		//verif if user is allowed to perform this action
		if (UserVerification.IsUserAnAdmin({ name: req.session.name, Rank: req.session.Rank })) {
			Queries.RemoveFoodFromPending(req.params.id, error => {
				if (error) {
					console.log(error);
					res.sendStatus(500);
					return;
				}

				console.log('[Foods] Food remove from pending');
				res.sendStatus(200);
			});
			return;
		}
	}
	res.sendStatus(500);
});

app.post('/foods/admin/move/:id', (req, res) => {
	//verify if id isnt empty
	if (req.params.id != 'undefined') {
		//verif if user is allowed to perform this action
		if (UserVerification.IsUserAnAdmin({ name: req.session.name, Rank: req.session.Rank })) {
			//See if the food is checked or not
			if (req.query.Checked == 'false') {
				Queries.MoveFoodToNormalDB(req.params.id, (err, InsertID) => {
					if (err) {
						console.log(err);
						res.sendStatus(500);
						return;
					}
					Queries.RemoveFoodFromPending(req.params.id, error => {
						if (error) {
							console.log(error);
							res.sendStatus(500);
							return;
						}

						res.json({ NewID: InsertID });
						console.log('[Foods] Foods has been moved ! Pending --> Normal');
						return;
					});
					return;
				});
				return;
			} else if (req.query.Checked == 'true') {
				Queries.MoveFoodToPendingDB(req.params.id, (err, InsertID) => {
					if (err) {
						console.log(err);
						res.sendStatus(500);
						return;
					}
					Queries.RemoveFoodFromNormal(req.params.id, error => {
						if (error) {
							console.log(error);
							res.sendStatus(500);
							return;
						}
						res.json({ NewID: InsertID });
						console.log('[Foods] Foods has been moved ! Pending --> Normal');

						return;
					});
					return;
				});
				return;
			}
		}
	}
	res.sendStatus(500);
});

app.get('/foods/unchecked', (req, res) => {
	if (UserVerification.IsUserAnAdmin({ name: req.session.name, Rank: req.session.Rank }))
		Queries.QueryDBForFoodUnchecked((Failed, result) => {
			if (Failed) {
				res.sendStatus(500);
				res.end();
			} else res.json(result);
		});
});

app.get('/foods/contrib', (req, res) => {
	if (req.session.name && req.session.hash) {
		Queries.QueryDBForContrib(req.session.hash, (Failed, result) => {
			if (Failed) {
				res.sendStatus(500);
				res.end();
			} else res.json(result);
		});
	}
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
			res.json({
				User: {
					Name: req.session.name,
					Rank: 0,
					Mail: req.session.mail
				}
			});
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
			res.json({
				User: {
					Name: req.session.name,
					Rank: req.session.Rank,
					Mail: req.session.mail
				}
			});
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
	req.body.Recipe = JSON.parse(req.body.Recipe);
	req.body.Ingredients = JSON.parse(req.body.Ingredients);
	VerifCredentials.CreateFormShem.validate(req.body)
		.then(() => {
			if (req.file && req.session.name) {
				//Delete unused params
				for (const i in req.body.Ingredients) {
					delete req.body.Ingredients[i].name;
					delete req.body.Ingredients[i].sciname;
				}
				req.body.Ingredients;
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
				return;
			}
			res.json({ CreateStatus: false });
		})
		.catch(err => {
			console.log('[Create - Food] Error ' + err.errors);
		});
});

//! For demo purpose (http)
https.createServer(options, app).listen(8080);

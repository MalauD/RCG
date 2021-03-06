var db = require('./Db');
const bcrypt = require('bcrypt');

module.exports = {
	CheckUserExisting: (UserToCheck, callback) => {
		console.log('[MySql] Checking if user exist');
		RetreiveSpecificDBUser(UserToCheck.Mail, (err, result) => {
			if (err) {
				console.log('[MySql] Error !');
				callback(undefined, err);
				return;
			}

			for (var element in result) {
				if (
					result[element].name == UserToCheck.Name ||
					result[element].mail == UserToCheck.Mail
				) {
					console.log('[MySql] User Exists');
					callback(true);
					return;
				}
			}
			console.log('[MySql] User does not exist');
			callback(false);
		});
	},

	SaveNewUserDB: (UserToSave, callback) => {
		console.log('[MySql] Saving user in DB');

		let Payload = {
			name: UserToSave.Name,
			mail: UserToSave.Mail,
			userhash: UserToSave.Hash
		};

		db.query('INSERT INTO usersid SET ?', Payload, (err, rows) => {
			if (err) {
				console.log('[MySql] Error !');
				callback(err);
				return;
			}
			console.log('[MySql] user saved to DB');
			callback();
		});
	},

	CheckUserLogin: (UserToCheck, callback) => {
		console.log('[MySql] Checking an user login');
		RetreiveSpecificDBUser(UserToCheck.Mail, (err, resp) => {
			if (err) {
				console.log('[MySql] Error !');
				callback(err);
				return;
			}
			let g = 0;
			//Loop over all account
			for (var k in resp) {
				if (resp[k].mail == UserToCheck.Mail) {
					console.log('[MySql] Comparing Hash of user #' + g);
					//Compare hash and password using bcrypt
					if (
						bcrypt.compareSync(
							UserToCheck.Password,
							resp[k].userhash
						)
					) {
						//Check if pass word match and call the callback function
						console.log('[MySql] Hash of user match !');
						callback(undefined, true, {
							Name: resp[k].name,
							Mail: resp[k].mail,
							Hash: resp[k].userhash,
							Rank: resp[k].rank,
							ImageLink: resp[k].ImageLink
						});
						return;
					} else {
						callback(undefined, false);
						return;
					}
				}
				g++;
			}
			console.log('[MySql] No user match after checking ${g} users');
			//if no Email match there is no login account..
			callback(undefined, false);
		});
	}
};

function RetreiveAllDBUsers(callback) {
	console.log('[MySql] Retreiving all users from the DB');
	//Make a DB request using the DB connection already created
	const query = 'SELECT * FROM usersid';
	db.query(query, (err, rows, field) => {
		//Call the CallBack with the result
		if (err) {
			console.log('[MySql] Error !');
			callback(err);
			return;
		}

		let resp = [];
		for (var k in rows) {
			resp.push(rows[k]);
		}

		console.log('[MySql] Found ' + resp.length + ' users');

		callback(undefined, resp);
	});
}

function RetreiveSpecificDBUser(Mail, callback) {
	console.log('[MySql] Retreiving specific users from the DB');
	//Make a DB request using the DB connection already created
	const query = 'SELECT * FROM usersid WHERE mail = ?';
	db.query(query, [Mail], (err, rows, field) => {
		//Call the CallBack with the result
		if (err) {
			console.log('[MySql] Error !');
			callback(err);
			return;
		}

		let resp = [];
		for (var k in rows) {
			resp.push(rows[k]);
		}

		console.log('[MySql] Found ' + resp.length + ' users');

		callback(undefined, resp);
	});
}

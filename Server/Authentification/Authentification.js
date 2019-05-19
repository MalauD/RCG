const VerifCredentials = require('./Verifications.js');
const DBUsers = require('./mysql_query_users.js');
const bcrypt = require('bcrypt');

module.exports = {
	SignupUser: function(req, res, Queries, SuccessCallback) {
		//Handle signup Post req.
		console.log('[Authentification] Signup requested with POST by ' + req.body.Name);
		//Check credentials contain in body
		VerifCredentials.CheckCredentials(req.body, (param, err) => {
			if (typeof err !== 'undefined') return SendErrorType(param, err, res);

			DBUsers.CheckUserExisting(req.body, Queries.connection, (result, err) => {
				if (err) return LogError(err, res);
				//Check if user already exist in DB
				if (result) {
					return SendErrorType('Name', ': Account already created', res);
				} else {
					console.log('[Authentification] Creating user ok');
					//Create an hash using bcrypt (async)
					bcrypt.hash(req.body.Password, 10, function(err, hash) {
						if (err) return LogError(err, res);

						req.body.Hash = hash;
						DBUsers.SaveNewUserDB(req.body, Queries.connection, err => {
							if (err) return LogError(err, res);

							console.log('[Authentification] User save in DB');
							//Log on session
							SuccessCallback(req.body);
						});
					});
				}
			});
		});
	},

	LoginUser: function(req, res, Queries, SuccessCallback) {
		console.log('[Authentification] Client requesting a login');
		VerifCredentials.CheckLoginCredentials(req.body, (param, err) => {
			if (typeof err !== 'undefined') {
				return SendErrorType(param, err, res);
			}
			DBUsers.CheckUserLogin(req.body, Queries.connection, (err, resp, account) => {
				if (err) return LogError(err, res);
				if (resp) {
					console.log('[Authentification] User successfully logged in');
					//Log on session
					SuccessCallback(account);
				} else {
					console.log('[Authentification] User failed logged in');
					return SendErrorType('Mail', 'Not valid account', res);
				}
			});
		});
	},

	/**
	 * Check if the vote of user exist
	 * @param {string} The user hash from the SB
	 * @param {JSON} The vote to check with idFoods and IsPositive
	 * @param {object} The existing sql connection
	 * @param {function} The callback function with (error,IsExisting,vote,vote array)
	 *
	 */

	CheckVoteExisting: (UserHash, vote, MySqlConnection, callback) => {
		console.log('[MySql] Checking if vote exist');
		const query = 'SELECT votes FROM usersid WHERE userhash = ?';
		MySqlConnection.query(query, [UserHash], (err, rows, field) => {
			//Call the CallBack with the result
			if (err) {
				console.log('[MySql] Error !');
				callback(err);
				return;
			}

			if (!rows[0].votes) {
				callback(null, false, null, votes);
				return;
			}

			if (rows.length == 1) {
				console.log('[MySql] Found vote for the user');
				try {
					var votes = JSON.parse(rows[0].votes);
					for (var vote in votes) {
						if (votes[vote].idFoods == vote.idFoods && votes[vote].idFoods == vote.IsPositive) {
							callback(null, true, votes[vote]);
							//A vote exist
							return;
						}
					}
					//No vote exist
					callback(null, false, null, votes);
					return;
				} catch (e) {
					callback(e);
				}
			}
		});
	},

	AddVotesToDB: (votesarray, userhash, MySqlConnection, callback) => {
		//TODO Implement vote using UPDATE method mysql https://www.tutorialspoint.com/mariadb/mariadb_update_query.htm

		console.log('[MySql] Adding vote to user account');
		const query = 'UPDATE foods SET vote = ?  WHERE userhash = ?';
		MySqlConnection.query(query, [votesarray, userhash], err => {
			if (err) {
				console.log('[MySql] Error !');
				callback(err);
				return;
			}
			callback();
		});
	}
};

function LogError(err, res) {
	console.log('[Authentification] ' + err);
	res.sendStatus(403);
	return;
}

function SendErrorType(param, err, res) {
	console.log('[Authentification] ' + param + err);
	//Send to the client the error + parameters that cause this error
	res.status(500).send({
		param,
		err
	});
	return;
}

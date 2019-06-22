var bcrypt = require('bcrypt');
const { CheckUserExisting, SaveNewUserDB, CheckUserLogin } = require('./../Db').Auth;
const { CheckCredentials, CheckLoginCredentials } = require('./../Authentification/Verifications');

module.exports = {
	SignupUser: function(User) {
		return new Promise((resolve, reject) => {
			//Handle signup Post req.
			console.log('[Authentification] Signup requested with POST by ' + User.Name);
			//Check credentials of user object
			CheckCredentials(User, (param, err) => {
				// TODO handle error
				if (typeof err !== 'undefined') {
					reject({ Error: true, Param: param, ErrParam: err });
					return;
				}

				CheckUserExisting(User, (result, err) => {
					if (err) {
						reject({ Error: err });
						return;
					}
					//Check if user already exist in DB
					if (result) {
						reject({ Error: true, Param: 'Name', ErrParam: ' Account already created' });
						return;
					} else {
						console.log('[Authentification] Creating user ok');
						//Create an hash using bcrypt (async)
						bcrypt.hash(User.Password, 10, function(err, hash) {
							if (err) {
								reject({ Error: err });
								return;
							}

							Object.assign(User, User, {
								Hash: hash
							});
							SaveNewUserDB(User, DBError => {
								if (DBError) {
									reject({ Error: DBError });
									return;
								}

								console.log('[Authentification] User save in DB');
								//Log on session
								resolve(User);
							});
						});
					}
				});
			});
		});
	},

	LoginUser: function(User) {
		return new Promise((resolve, reject) => {
			console.log('[Authentification] Client requesting a login');
			CheckLoginCredentials(User, (param, err) => {
				if (typeof err !== 'undefined') {
					console.log(param + err);
					reject({ Error: true, Param: param, ErrParam: err });
					return;
				}
				CheckUserLogin(User, (err, resp, account) => {
					if (err) {
						reject({ Error: err });
						return;
					}
					if (resp) {
						console.log('[Authentification] User successfully logged in');
						//Log on session
						resolve(account);
					} else {
						console.log('[Authentification] User failed logged in');
						reject({ Error: true, Param: 'Mail', ErrParam: ' Invalid account' });
					}
				});
			});
		});
	}
};

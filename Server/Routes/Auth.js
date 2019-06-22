const app = (module.exports = require('express')());

const { SignupUser, LoginUser } = require('./../Actions').Auth;

app.post('/Signup', (req, res) => {
	if (req.session.name) res.sendStatus(201);
	else
		SignupUser(req.body)
			.then(User => {
				console.log('[Session] Saving user in Session');
				req.session.name = User.Name;
				req.session.mail = User.Mail;
				//Save hash of the password
				req.session.hash = User.Hash;
				console.log('[Session] User save in Session');
				//send a Created (201) to the client
				res.json({
					User: {
						name: req.session.name,
						rank: 0,
						mail: req.session.mail
					}
				});
			})
			.catch(err => {
				console.log(
					'[Auth] Error: ' +
						err.Error +
						' Param ' +
						err.Param +
						' Error ' +
						err.ErrParam
				);

				err.Error == 'undefined'
					? res.sendStatus(403)
					: res.status(500).send({
							param: err.Param,
							err: err.ErrParam
					  });
			});
});

app.post('/login', (req, res) => {
	if (req.session.name) res.sendStatus(201);
	else
		LoginUser(req.body)
			.then(User => {
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
						name: req.session.name,
						rank: req.session.Rank,
						mail: req.session.mail,
						ImageLink: User.ImageLink
					}
				});
			})
			.catch(err => {
				console.log(
					'[Auth] Error: ' +
						err.Error +
						' Param ' +
						err.Param +
						' Error ' +
						err.ErrParam
				);

				err.Error == 'undefined'
					? res.sendStatus(403)
					: res.status(500).send({
							param: err.Param,
							err: err.ErrParam
					  });
			});
});

app.get('/Logout', (req, res) => {
	console.log('[Session] Client request a logout');
	req.session.destroy();
	console.log('[Session] Session destroyed redirecting...');
	res.redirect('/');
});

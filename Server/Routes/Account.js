const app = (module.exports = require('express')());
const UploadMulter = require('./../FileManager').UploadManager;
const {
	GetAccount,
	GetUserById,
	UpdateAccount
} = require('./../Actions').Account;

app.get('/User', (req, res) => {
	GetAccount(req.session)
		.then(User => {
			res.send(User);
		})
		.catch(err => {
			console.log('[User - Error] ' + err);
			res.sendStatus(403);
		});
});

app.get('/Users/id/:id', (req, res) => {
	GetUserById(req.params.id)
		.then(DbResult => res.send(DbResult))
		.catch(() => res.sendStatus(404));
});

app.post('/User/Update', UploadMulter.single('ImageFile'), (req, res) => {
	let AccountImageLink = '/FoodImage/' + req.file.filename;
	UpdateAccount(req.session.hash, AccountImageLink)
		.then(() => {
			console.log('[Account] Image account changed !');
			res.json({ Updated: true, ImageLink: AccountImageLink });
		})
		.catch(err => {
			console.log('[Account] Image account not changed : Error' + err);
			res.json({ Updated: false });
		});
});

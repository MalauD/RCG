const app = (module.exports = require('express')());
const {
	GetMealByName,
	GetMealById,
	GetUserContrib,
	GetUncheckedMeals,
	GetTrendingMealByRCG,
	CreateMeal
} = require('./../Actions/index').Meal;
const UploadMulter = require('./../FileManager').UploadManager;

app.get('/Search/Name/:query', (req, res) => {
	GetMealByName(req.params.query)
		.then(DbResult => {
			res.json(DbResult);
		})
		.catch(() => {
			res.sendStatus(500);
		});
});

app.get('/Search/Id/:id', (req, res) => {
	GetMealById(req.params.id, req.query.Checked, req.session)
		.then(DbResult => {
			res.json(DbResult);
		})
		.catch(() => {
			res.sendStatus(500);
		});
});

app.get('/Contrib', (req, res) => {
	GetUserContrib(req.session.hash)
		.then(DbResult => {
			res.json(DbResult);
		})
		.catch(() => {
			res.sendStatus(500);
		});
});

app.get('/Unchecked', (req, res) => {
	GetUncheckedMeals(req.session)
		.then(DbResult => {
			res.json(DbResult);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

app.get('/Trending/rcg', (req, res) => {
	GetTrendingMealByRCG()
		.then(DbResult => {
			res.json(DbResult);
		})
		.catch(() => {
			res.sendStatus(500);
		});
});

app.post('/Create', UploadMulter.single('ImageFile'), (req, res) => {
	CreateMeal(req.body, req.file, req.session)
		.then(() => {
			res.json({ CreateStatus: true });
		})
		.catch(err => {
			res.json({ CreateStatus: false });
		});
});

const app = (module.exports = require('express')());

const { DeleteMealById, MoveMealToNormal, MoveMealToPending } = require('./../Actions').Admin;

app.post('/Delete/Meal/:id', (req, res) => {
	DeleteMealById(req.params.id, req.session)
		.then(() => res.sendStatus(200))
		.catch(err => {
			console.log(err);
			res.sendStatus(200);
		});
});

app.post('/Move/Meal/:id', (req, res) => {
	if (req.query.Checked == 'false') {
		MoveMealToNormal(req.params.id, req.session)
			.then(Result => res.json({ NewID: Result.NewID }))
			.catch(err => {
				console.log(err);
				res.sendStatus(500);
			});
	} else if (req.query.Checked == 'true') {
		MoveMealToPending(req.params.id, req.session)
			.then(Result => res.json({ NewID: Result.NewID }))
			.catch(err => {
				console.log(err);
				res.sendStatus(500);
			});
	}
});

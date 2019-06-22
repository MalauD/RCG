const {
	GetIngredientById,
	SearchIngredientsByName,
	GetIngredientsByGroup,
	GetIngredientsBySubGroup
} = require('./../Actions').Ingredient;

const app = (module.exports = require('express')());

app.get('/Search/Id/:id', (req, res) => {
	GetIngredientById(req.params.id)
		.then(DbResult => res.json(DbResult))
		.catch(() => res.sendStatus(500));
});

app.get('/Search/Name/:name', (req, res) => {
	SearchIngredientsByName(req.params.name)
		.then(DbResult => res.json(DbResult))
		.catch(() => res.sendStatus(500));
});

app.get('/Group/name/:name', (req, res) => {
	GetIngredientsByGroup(req.params.name)
		.then(DbResult => res.json(DbResult))
		.catch(() => res.sendStatus(500));
});

app.get('/SubGroup/name/:name', (req, res) => {
	GetIngredientsBySubGroup(req.params.name)
		.then(DbResult => res.json(DbResult))
		.catch(() => res.sendStatus(500));
});

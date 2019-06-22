var db = require('./Db');

module.exports = {
	QueryDBForMeal(foodname, callback) {
		const Query =
			'SELECT idFoods, Name, ImageLink, RCG, PrepTime, People,CreatedAt FROM foods WHERE MATCH(Name,Content) AGAINST(? IN BOOLEAN MODE)';
		console.log('[MySql - Food] Requesting DB for food');
		db.query(Query, [foodname], (err, rows, field) => {
			if (err) {
				console.log(err);
				callback(true);
				return;
			}

			console.log('[MySql - Food] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	},

	QueryDBForMealByID(foodID, IsFoodChecked = 'true', callback) {
		let Query = '';
		if (IsFoodChecked == 'true') Query = 'SELECT * FROM foods WHERE idFoods = ?';
		else if (IsFoodChecked == 'false') Query = 'SELECT * FROM foodsnew WHERE idFoods = ?';

		console.log('[MySql - Food] Requesting DB for food by ID with Checked = ' + IsFoodChecked);

		db.query(Query, foodID, (err, rows, field) => {
			if (err) {
				console.log(err);
				db.end();
				callback(true);
				return;
			}
			if (!rows[0]) {
				console.log('[MySql - Food] No food found for this id');
				callback(true);
				return;
			}

			if (rows[0].Content) {
				rows[0].Content = JSON.parse(rows[0].Content);
			} else {
				console.log('[MySql - Food] No recipe found for this id');
			}

			if (rows[0].Ingredients) {
				rows[0].Ingredients = JSON.parse(rows[0].Ingredients);
			} else {
				console.log('[MySql - Food] No ingredients list found for this id');
			}

			console.log('[MySql - Food] Found food for requested id');

			callback(false, rows[0]);
		});
	},

	QueryDBForMealUnchecked(callback) {
		const Query = 'SELECT * FROM foodsnew';
		console.log('[MySql - Food] Requesting DB for unchecked');

		db.query(Query, (err, rows, field) => {
			if (err) {
				console.log(err);
				db.end();
				callback(true);
				return;
			}

			let resp = [];
			for (var k in rows) {
				//console.log(rows[k].Content);
				if (rows[k].Content) {
					rows[k].Content = JSON.parse(rows[k].Content);
				} else {
					console.log('[MySql - Food] No recipe found for this id');
				}

				if (rows[k].Ingredients) {
					rows[k].Ingredients = JSON.parse(rows[k].Ingredients);
				} else {
					console.log('[MySql - Food] No ingredients list found for this id');
				}
				resp.push(rows[k]);
			}

			console.log('[MySql - Food] Found ' + resp.length + ' results');

			callback(false, resp);
		});
	},

	QueryDBForContrib(userhash, callback) {
		const Query = 'SELECT * FROM foods WHERE userhash = ?';
		console.log('[MySql - Food] Requesting DB for contrib food');

		db.query(Query, [userhash], (err, rows, field) => {
			if (err) {
				console.log(err);
				db.end();
				callback(true);
				return;
			}

			let resp = [];
			for (var k in rows) {
				//console.log(rows[k].Content);
				if (rows[k].Content) {
					rows[k].Content = JSON.parse(rows[k].Content);
				} else {
					console.log('[MySql - Food] No recipe found for this id');
				}

				if (rows[k].Ingredients) {
					rows[k].Ingredients = JSON.parse(rows[k].Ingredients);
				} else {
					console.log('[MySql - Food] No ingredients list found for this id');
				}
				resp.push(rows[k]);
			}

			console.log('[MySql - Food] Found ' + resp.length + ' results');

			callback(false, resp);
		});
	},

	GetBestRCGMeal: (limit, callback) => {
		//Get the best rcg food;
		const Query =
			'SELECT idFoods, Name, ImageLink, RCG, PrepTime, People,CreatedAt FROM foods ORDER BY RCG DESC LIMIT ?';
		console.log('[MySql - Food] Getting the best rcg food');
		db.query(Query, [limit], (err, rows, field) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}

			console.log('[MySql - Food] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	},

	AddFoodToPendingDB: (food, userhash, foodImage, callback) => {
		console.log('[MySql - Food] Appending meal to the DB');
		var payload = {
			Name: food.Name,
			RCG: food.RCG,
			Content: JSON.stringify(food.Recipe),
			ImageLink: foodImage,
			userhash: userhash,
			PrepTime: food.PrepTime,
			People: food.People,
			Ingredients: JSON.stringify(food.Ingredients),
			CreatedAt: Date.now()
		};

		const Query = 'INSERT INTO foodsnew SET ?';
		db.query(Query, payload, (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Meal saved in DB');
			callback();
		});
	}
};

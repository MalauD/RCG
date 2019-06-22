var db = require('./Db');

module.exports = {
	GetIngredientById: (id, callback) => {
		const Query = 'SELECT * FROM FoodsList WHERE ID = ?';
		console.log('[Mysql - Ingredient] Getting Ingredient by id');
		db.query(Query, [id], (err, rows) => {
			if (err) {
				console.log('[MySql - Ingredient] Error !');
				callback(err);
				return;
			}
			if (rows[0]) callback(null, rows[0]);
			else callback();
		});
	},

	SearchIngredientsByName: (Name, Limit, callback) => {
		const Query =
			'SELECT * FROM FoodsList WHERE MATCH(FOOD_NAME,SCIENTIFIC_NAME) AGAINST(? IN BOOLEAN MODE) LIMIT ?';
		console.log('[Mysql - Ingredient] Searching Ingredient by name with LIMIT = ' + Limit);
		if (Name == '*') {
			console.log('[MySql - Ingredient] Error !');
			callback(err);
			return;
		}
		db.query(Query, [Name, Limit], (err, rows, field) => {
			if (err) {
				console.log(err);
				callback(err);
				return;
			}

			console.log('[Mysql - Ingredient] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	},

	GetIngredientsByGroup: (GroupName, callback) => {
		const Query = 'SELECT * FROM FoodsList WHERE FGROUP = ?';
		console.log('[Mysql - Ingredient] Retreiving Ingredient by group name');
		db.query(Query, [GroupName], (err, rows, field) => {
			if (err) {
				console.log(err);
				callback(err);
				return;
			}

			console.log('[Mysql - Ingredient] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	},

	GetIngredientsBySubGroup: (SubGroupName, callback) => {
		const Query = 'SELECT * FROM FoodsList WHERE SUB_FGROUP = ?';
		console.log('[Mysql - Ingredient] Retreiving Ingredient by sub group name');
		db.query(Query, [SubGroupName], (err, rows, field) => {
			if (err) {
				console.log(err);
				callback(err);
				return;
			}

			console.log('[Mysql - Ingredient] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	}
};

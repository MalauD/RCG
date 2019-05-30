module.exports = {
	GetFoodItemById: (id, Connection, callback) => {
		const Query = 'SELECT * FROM FoodsList WHERE ID = ?';
		console.log('[Mysql - Foodlist] Getting foodlist by id');
		Connection.query(Query, [id], (err, rows) => {
			if (err) {
				console.log('[MySql - Foodlist] Error !');
				callback(err);
				return;
			}
			if (rows[0]) callback(null, rows[0]);
			else callback();
		});
	},

	GetFoodItemByName: (Name, Limit, Connection, callback) => {
		const Query =
			'SELECT * FROM FoodsList WHERE MATCH(FOOD_NAME,SCIENTIFIC_NAME) AGAINST(? IN BOOLEAN MODE) LIMIT ?';
		console.log('[Mysql - Foodlist] Searching foodlist by name with LIMIT = ' + Limit);
		if (Name == '*') {
			console.log('[MySql - Foodlist] Error !');
			callback(err);
			return;
		}
		Connection.query(Query, [Name, Limit], (err, rows, field) => {
			if (err) {
				console.log(err);
				callback(err);
				return;
			}

			console.log('[Mysql - Foodlist] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	}
};

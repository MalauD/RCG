var sql = require('mysql');

class MySqlQuery {
	constructor() {
		this.Connect();
	}

	Connect() {
		this.CreateConnection();
		this.ConnectToDB(error => {
			if (error) console.log(error);
		});
		this.connection.on('error', err => this.HandleSQLError(err));
	}

	CreateConnection() {
		this.connection = sql.createConnection({
			host: 'localhost',
			user: 'RCGClient',
			password: 'rcgclient',
			database: 'RCGDB'
		});
	}

	HandleSQLError(err) {
		console.log('[MySql - Error] Error catched in mysql !');
		if (err.code == 'PROTOCOL_CONNECTION_LOST') {
			console.log('[Mysql - Error] Error: ' + err.code);
			this.Connect();
		} else {
			console.log(err);
			this.connection.destroy();
			this.Connect();
		}
	}

	RequestFoodsByName(foodname, callback) {
		console.log('[MySql - Food] Requestion food for ' + foodname);

		this.QueryDBForFood(foodname, (errorDB, response) => {
			if (errorDB) {
				callback(errorDB, null);
				this.connection.end();
			}
			callback(null, response);
		});
	}

	ConnectToDB(callback) {
		console.log('[MySql] Connecting to RCG database...');
		this.connection.connect(function(err) {
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			console.log('[MySql] Connected to RCG database');
			callback(false);
		});
	}

	QueryDBForFood(foodname, callback) {
		const Query =
			'SELECT idFoods, Name, ImageLink, RCG, PrepTime, People,CreatedAt FROM foods WHERE MATCH(Name,Content) AGAINST(? IN BOOLEAN MODE)';
		console.log('[MySql - Food] Requesting DB for food');
		this.connection.query(Query, [foodname], (err, rows, field) => {
			if (err) {
				console.log(err);
				this.connection.end();
				callback(true);
				return;
			}

			console.log('[MySql - Food] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	}

	QueryDBForFoodByID(foodID, IsFoodChecked = 'true', callback) {
		let Query = '';
		if (IsFoodChecked == 'true') Query = 'SELECT * FROM foods WHERE idFoods = ?';
		else if (IsFoodChecked == 'false') Query = 'SELECT * FROM foodsnew WHERE idFoods = ?';

		console.log('[MySql - Food] Requesting DB for food by ID with Checked = ' + IsFoodChecked);

		this.connection.query(Query, foodID, (err, rows, field) => {
			if (err) {
				console.log(err);
				this.connection.end();
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
	}

	QueryDBForFoodUnchecked(callback) {
		const Query = 'SELECT * FROM foodsnew';
		console.log('[MySql - Food] Requesting DB for unchecked');

		this.connection.query(Query, (err, rows, field) => {
			if (err) {
				console.log(err);
				this.connection.end();
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
	}

	QueryDBForContrib(userhash, callback) {
		const Query = 'SELECT * FROM foods WHERE userhash = ?';
		console.log('[MySql - Food] Requesting DB for contrib food');

		this.connection.query(Query, [userhash], (err, rows, field) => {
			if (err) {
				console.log(err);
				this.connection.end();
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
	}

	MoveFoodToNormalDB(idFoods, callback) {
		const Query =
			'INSERT INTO foods (Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt) SELECT Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt FROM foodsnew WHERE idFoods = ?';
		console.log('[MySql - Food] Moving food from pending to normal');

		this.connection.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback(null, rows.insertId);
		});
	}

	MoveFoodToPendingDB(idFoods, callback) {
		const Query =
			'INSERT INTO foodsnew (Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt) SELECT Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt FROM foods WHERE idFoods = ?';
		console.log('[MySql - Food] Moving food from normal to pending');

		this.connection.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback(null, rows.insertId);
		});
	}

	RemoveFoodFromPending(idFoods, callback) {
		const Query = 'DELETE FROM foodsnew WHERE idFoods = ?';
		console.log('[MySql - Food] Removing food from pending DB');

		this.connection.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback();
		});
	}

	RemoveFoodFromNormal(idFoods, callback) {
		const Query = 'DELETE FROM foods WHERE idFoods = ?';
		console.log('[MySql - Food] Removing food from normal DB');

		this.connection.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback();
		});
	}

	AddFoodToPendingDB(food, userhash, foodImage, callback) {
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
		this.connection.query(Query, payload, (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Meal saved in DB');
			callback();
		});
	}

	GetLatestInsertedID(callback) {
		const Query = 'SELECT LAST_INSERT_ID()';
		console.log('[MySql - Food] Getting latest inserted ID');
		this.connection.query(Query, (err, rows, field) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			let resp = rows[0];

			console.log('[MySql - Food] Found last id ' + resp['LAST_INSERT_ID()']);

			callback(null, resp['LAST_INSERT_ID()']);
		});
	}

	GetBestRCGMeal(limit, callback) {
		//Get the best rcg food;
		const Query =
			'SELECT idFoods, Name, ImageLink, RCG, PrepTime, People,CreatedAt FROM foods ORDER BY RCG DESC LIMIT ?';
		console.log('[MySql - Food] getting the best rcg food');
		this.connection.query(Query, [limit], (err, rows, field) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}

			console.log('[MySql - Food] Found ' + rows.length + ' results');

			callback(false, rows);
		});
	}
}

module.exports = MySqlQuery;

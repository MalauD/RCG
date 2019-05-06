var sql = require('mysql');

class MySqlQuery {
	constructor() {
		this.CreateConnection();
		this.ConnectToDB(error => {
			if (error) throw error;
		});
	}

	CreateConnection() {
		this.connection = sql.createConnection({
			host: 'localhost',
			user: 'RCGClient',
			password: 'rcgclient',
			database: 'RCGDB'
		});
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
		const Query = 'SELECT * FROM foods WHERE MATCH(Name,Content) AGAINST(? IN BOOLEAN MODE)';
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

	QueryDBForFoodByID(foodID, callback) {
		const Query = 'SELECT * FROM foods WHERE idFoods = ?';
		console.log('[MySql - Food] Requesting DB for food by ID');

		this.connection.query(Query, foodID, (err, rows, field) => {
			if (err) {
				console.log(err);
				this.connection.end();
				callback(true);
				return;
			}

			let resp = [];
			for (var k in rows) {
				resp.push(rows[k]);
			}

			console.log('[MySql - Food] Found ' + resp.length + ' results');

			callback(false, resp);
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
				resp.push(rows[k]);
			}

			console.log('[MySql - Food] Found ' + resp.length + ' results');

			callback(false, resp);
		});
	}

	AddFoodToPendingDB(food, userhash, foodImage, callback) {
		console.log('[MySql - Food] Appending meal to the DB');
		var payload = {
			Name: food.Name,
			RCG: food.RCG,
			Content: food.Recipe,
			ImageLink: foodImage,
			userhash: userhash
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
}

module.exports = MySqlQuery;

var sql = require('mysql');

class MySqlQuery {
	constructor() {
		this.CreateConnection();
		this.ConnectToDB(error => {
			if (error) console.log(error);
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

			rows[0].Content = JSON.parse(rows[0].Content);

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
				rows[k].Content = JSON.parse(rows[k].Content);
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
			Content: JSON.stringify(food.Recipe),
			ImageLink: foodImage,
			userhash: userhash
		};

		// ! This for demo PURPOSE ONLY (foods => foodsnew)
		const Query = 'INSERT INTO foods SET ?';
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

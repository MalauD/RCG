var db = require('./Db');

module.exports = {
	MoveMealToNormalDB: (idFoods, callback) => {
		const Query =
			'INSERT INTO foods (Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt) SELECT Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt FROM foodsnew WHERE idFoods = ?';
		console.log('[MySql - Food] Moving food from pending to normal');

		db.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback(null, rows.insertId);
		});
	},

	MoveMealToPendingDB: (idFoods, callback) => {
		const Query =
			'INSERT INTO foodsnew (Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt) SELECT Name, Content, ImageLink, RCG, userhash, PrepTime, People, Ingredients, CreatedAt FROM foods WHERE idFoods = ?';
		console.log('[MySql - Food] Moving food from normal to pending');

		db.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback(null, rows.insertId);
		});
	},

	RemoveMealFromPending: (idFoods, callback) => {
		const Query = 'DELETE FROM foodsnew WHERE idFoods = ?';
		console.log('[MySql - Food] Removing food from pending DB');

		db.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback();
		});
	},

	RemoveMealFromNormal: (idFoods, callback) => {
		const Query = 'DELETE FROM foods WHERE idFoods = ?';
		console.log('[MySql - Food] Removing food from normal DB');

		db.query(Query, [idFoods], (err, rows) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			console.log('[MySql - Food] Completed');
			callback();
		});
	}
};

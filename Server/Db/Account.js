var db = require('./Db');

module.exports = {
	GetUserAccountById: (Id, callback) => {
		const query =
			'SELECT name, mail, rank,userhash ,ImageLink FROM usersid WHERE uidkey = ?';
		console.log('[MySql - Account] Getting user by id');
		db.query(query, [Id], (err, rows, field) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			if (rows.length != 0) callback(null, rows[0]);
			else callback(null, null);
		});
	},

	UpdateUserImage: (UserHash, ImagePath, callback) => {
		const query = 'UPDATE usersid SET ImageLink = ? WHERE userhash = ?';
		console.log('[MySql - Account] Updating account image');
		db.query(query, [ImagePath, UserHash], (err, rows, field) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			callback();
		});
	},

	GetUserAccountByHash: (Hash, callback) => {
		const query =
			'SELECT uidkey, name, mail, rank, ImageLink FROM usersid WHERE userhash = ?';
		console.log('[MySql - Account] Getting user by hash');
		db.query(query, [Hash], (err, rows, field) => {
			if (err) {
				console.log('[MySql - Food] Error !');
				callback(err);
				return;
			}
			if (rows.length != 0) callback(null, rows[0]);
			else callback(null, null);
		});
	}
};

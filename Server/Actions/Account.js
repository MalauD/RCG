const { GetUserAccountById, UpdateUserImage, GetUserAccountByHash } = require('./../Db').Account;

const { QueryDBForContrib } = require('./../Db').Meal;

module.exports = {
	GetAccount: Session => {
		return new Promise((resolve, reject) => {
			Session.hash
				? GetUserAccountByHash(Session.hash, (err, result) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(result);
				  })
				: reject();
		});
	},

	GetUserById: Id => {
		return new Promise((resolve, reject) => {
			Id
				? GetUserAccountById(Id, (err, result) => {
						if (err) {
							reject(err);
							return;
						}
						QueryDBForContrib(result.userhash, (err2, result2) => {
							if (err2) {
								reject(err2);
								return;
							}
							Object.assign(result, {
								Contrib: result2
							});
							resolve(result);
						});
				  })
				: reject();
		});
	},

	UpdateAccount: (UserHash, FileName) => {
		return new Promise((resolve, reject) => {
			UserHash
				? UpdateUserImage(UserHash, FileName, err => {
						if (err) {
							reject(err);
							return;
						}
						resolve();
				  })
				: reject();
		});
	}
};

const {
	GetUserAccountById,
	UpdateUserImage,
	GetUserAccountByHash
} = require('./../Db').Account;

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
						resolve(result);
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

const {
	MoveMealToNormalDB,
	MoveMealToPendingDB,
	RemoveMealFromPending,
	RemoveMealFromNormal
} = require('./../Db').Admin;
const { IsUserAnAdmin } = require('./../UserVerifications/UserStateVerification');

module.exports = {
	DeleteMealById: (MealId, User) => {
		return new Promise((resolve, reject) => {
			if (MealId != 'undefined') {
				if (IsUserAnAdmin({ name: User.name, Rank: User.Rank })) {
					RemoveMealFromPending(MealId, err => {
						if (err) {
							reject(err);
						} else {
							console.log('[Foods] Food remove from pending');
							resolve();
						}
					});
				} else {
					reject();
				}
			} else {
				reject();
			}
		});
	},

	MoveMealToNormal: (MealId, User) => {
		return new Promise((resolve, reject) => {
			if (MealId != 'undefined') {
				if (IsUserAnAdmin({ name: User.name, Rank: User.Rank })) {
					MoveMealToNormalDB(MealId, (err, InsertId) => {
						if (err) {
							reject(err);
						} else {
							RemoveMealFromPending(MealId, error => {
								if (error) {
									reject(err);
								} else {
									console.log('[Foods] Foods has been moved ! Pending --> Normal');
									resolve({ NewID: InsertId });
									return;
								}
							});
						}
					});
				} else {
					reject();
				}
			} else {
				reject();
			}
		});
	},

	MoveMealToPending: (MealId, User) => {
		return new Promise((resolve, reject) => {
			if (MealId != 'undefined') {
				if (IsUserAnAdmin({ name: User.name, Rank: User.Rank })) {
					MoveMealToPendingDB(MealId, (err, InsertId) => {
						if (err) {
							reject(err);
						} else {
							RemoveMealFromNormal(MealId, error => {
								if (error) {
									reject(err);
								} else {
									console.log('[Foods] Foods has been moved ! Normal --> Pending');
									resolve({ NewID: InsertId });
									return;
								}
							});
						}
					});
				} else {
					reject();
				}
			} else {
				reject();
			}
		});
	}
};

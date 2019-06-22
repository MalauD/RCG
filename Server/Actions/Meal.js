const {
	QueryDBForMeal,
	QueryDBForMealByID,
	QueryDBForMealUnchecked,
	QueryDBForContrib,
	GetBestRCGMeal,
	AddFoodToPendingDB
} = require('./../Db/index').Meal;
const { GetUserAccountByHash } = require('./../Db').Account;
const CreateFormShem = require('./../Authentification/Verifications')
	.CreateFormShem;
const {
	IsUserAnAdmin
} = require('./../UserVerifications/UserStateVerification');

module.exports = {
	GetMealByName: Name => {
		return new Promise((resolve, reject) => {
			//Check if name isn't null
			Name
				? QueryDBForMeal(Name, (err, result) => {
						if (err) {
							reject(err);
						}
						resolve(result);
				  })
				: reject();
		});
	},

	GetMealById: (Id, IsChecked, UserSession) => {
		return new Promise((resolve, reject) => {
			//Check if the user has the autorisation to view this meal
			if (
				IsChecked == 'false' &&
				!IsUserAnAdmin({
					name: UserSession.name,
					Rank: UserSession.Rank
				})
			) {
				reject();
			}

			Id
				? QueryDBForMealByID(Id, IsChecked, (err, result) => {
						if (err) {
							reject(err);
							return;
						}
						GetUserAccountByHash(
							result.userhash,
							(err2, result2) => {
								if (err2) {
									reject(err2);
									return;
								}
								Object.assign(result, {
									Creator: result2
								});
								resolve(result);
							}
						);
				  })
				: reject();
		});
	},

	GetUncheckedMeals: UserSession => {
		return new Promise((resolve, reject) => {
			//If user is an admin allow him to access to the db content

			IsUserAnAdmin({ name: UserSession.name, Rank: UserSession.Rank })
				? QueryDBForMealUnchecked((err, result) => {
						if (err) {
							reject(err);
							return;
						}
						GetUserAccountByHash(
							result.userhash,
							(err2, result2) => {
								if (err2) {
									reject(err2);
									return;
								}
								Object.assign(result, {
									Creator: result2
								});
								resolve(result);
							}
						);
				  })
				: reject();
		});
	},

	GetUserContrib: UserHash => {
		return new Promise((resolve, reject) => {
			UserHash
				? QueryDBForContrib(UserHash, (err, result) => {
						if (err) {
							reject(err);
						}
						resolve(result);
				  })
				: reject();
		});
	},

	GetTrendingMealByRCG: () => {
		return new Promise((resolve, reject) => {
			GetBestRCGMeal(5, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	},

	CreateMeal: (Body, UploadFile, UserSession) => {
		return new Promise((resolve, reject) => {
			//Parse Recipe + ingredients
			// ? Is it really necessary to transmit them as a string ???
			Body.Recipe = JSON.parse(Body.Recipe);
			Body.Ingredients = JSON.parse(Body.Ingredients);
			//Validate form with yup

			// ! ~ Not very good code... (err handle)
			try {
				CreateFormShem.validateSync(Body);
				if (UploadFile && UserSession.name) {
					//Delete unused params
					for (const i in Body.Ingredients) {
						delete Body.Ingredients[i].name;
						delete Body.Ingredients[i].sciname;
					}
					Body.Ingredients;
					console.log('[Create - Food] Got a new food submit');
					console.log('[Create - Food]  Name:' + Body.Name);
					console.log('[Create - Food]  RCG:' + Body.RCG);
					console.log(
						'[Create - Food] Image saved as ' + UploadFile.filename
					);
					let FoodImageLink = '/FoodImage/' + UploadFile.filename;
					console.log(
						'[Create - Food] Image saved in ' + FoodImageLink
					);
					AddFoodToPendingDB(
						Body,
						UserSession.hash,
						FoodImageLink,
						err => {
							if (err) {
								console.log(err);
								reject(err);
								return;
							}
							resolve();
							return;
						}
					);
					return;
				}
				reject();
			} catch (err) {
				console.log('[Create - Food] Create schema not valid');
				console.log('[Create - Food] Error : ' + err);
				reject(err);
			}
		});
	}
};

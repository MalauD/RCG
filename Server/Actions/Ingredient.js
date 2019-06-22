const {
	GetIngredientById,
	SearchIngredientsByName,
	GetIngredientsByGroup,
	GetIngredientsBySubGroup
} = require('./../Db').Ingredient;

module.exports = {
	GetIngredientById: id => {
		return new Promise((resolve, reject) => {
			GetIngredientById(id, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	},
	SearchIngredientsByName: name => {
		return new Promise((resolve, reject) => {
			name
				? SearchIngredientsByName(name, 5, (err, result) => {
						if (err) {
							reject(err);
						}
						resolve(result);
				  })
				: reject();
		});
	},

	GetIngredientsByGroup: groupname => {
		return new Promise((resolve, reject) => {
			groupname
				? GetIngredientsByGroup(groupname, (err, result) => {
						if (err) {
							reject(err);
						}
						resolve(result);
				  })
				: reject();
		});
	},

	GetIngredientsBySubGroup: subgroupname => {
		return new Promise((resolve, reject) => {
			subgroupname
				? GetIngredientsBySubGroup(subgroupname, (err, result) => {
						if (err) {
							reject(err);
						}
						resolve(result);
				  })
				: reject();
		});
	}
};

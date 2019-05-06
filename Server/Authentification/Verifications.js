var yup = require('yup');

module.exports = {
	/**
	 *    This function check if Credentials are well written (empty for exemple)
	 */
	CheckCredentials: function(Cred, callback) {
		//Check name empty
		if (!Cred.Name) {
			callback('Name', 'is empty');
			return;
		}

		//Check mail empty
		if (!Cred.Mail) {
			callback('Mail', 'is empty');
			return;
		}
		//Check mail valid
		if (!emailIsValid(Cred.Mail)) {
			callback('Mail', 'is not valid');
			return;
		}
		//Check password empty
		if (!Cred.Password) {
			callback('Password', 'is empty');
			return;
		}
		//Check password length
		if (new String(Cred.Password).length < 8) {
			callback('Password', 'has a length < 8');
			return;
		}

		callback();
	},

	CheckLoginCredentials: function(Cred, callback) {
		//Check mail empty
		if (!Cred.Mail) {
			callback('Mail', 'is empty');
			return;
		}
		//Check mail valid
		if (!emailIsValid(Cred.Mail)) {
			callback('Mail', 'is not valid');
			return;
		}
		//Check password empty
		if (!Cred.Password) {
			callback('Password', 'is empty');
			return;
		}
		//Check password length
		if (new String(Cred.Password).length < 8) {
			callback('Password', 'has a length < 8');
			return;
		}

		callback();
	},

	CreateFormShem: yup.object().shape({
		Name: yup.string().required(),
		RCG: yup
			.number()
			.required()
			.positive()
			.integer()
			.min(0)
			.max(20),
		Recipe: yup
			.string()
			.required()
			.min(10)
			.max(2000)
	})
};

function emailIsValid(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

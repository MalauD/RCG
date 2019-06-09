module.exports = {
	IsUserAnAdmin: function({ name, Rank }) {
		if (!name || !Rank) {
			return false;
		}
		if (Rank > 100) {
			return true;
		} else {
			return false;
		}
	}
};

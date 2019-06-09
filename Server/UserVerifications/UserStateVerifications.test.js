var Verif = require('./UserStateVerification');

describe('UserStateDescription', () => {
	it('Should handle admin verif', () => {
		//Data test
		let User1 = { name: 'Malaury', Rank: '120' };
		let User2 = { name: 'Malaury', Rank: '0' };
		let User3 = { name: '', Rank: '120' };
		let User4 = { name: '', Rank: '' };

		//Do test
		expect(Verif.IsUserAnAdmin(User1)).toEqual(true);
		expect(Verif.IsUserAnAdmin(User2)).toEqual(false);
		expect(Verif.IsUserAnAdmin(User3)).toEqual(false);
		expect(Verif.IsUserAnAdmin(User4)).toEqual(false);
	});
});

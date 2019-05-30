var verif = require('./Verifications');

describe('CheckCredentials', () => {
	it('Should handle the email', () => {
		expect(verif.emailIsValid('')).toEqual(false);
		expect(verif.emailIsValid('malaury')).toEqual(false);
		expect(verif.emailIsValid('malaury@gmail')).toEqual(false);
		expect(verif.emailIsValid('malaury.dutour')).toEqual(false);
		expect(verif.emailIsValid('malaury@gmail.com')).toEqual(true);
	});

	it('Should handle meal', () => {
		/*expect(
			verif.CreateFormShem.validateSync({ Name: '', RCG: '10', Recipe: [{ Recipe: 'Malaury is the best' }] })
		).toEqual(false);
		expect(
			verif.CreateFormShem.validateSync({
				Name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
			})
		).toEqual(false);
		expect(
			verif.CreateFormShem.validateSync({
				Name: 'malaury',
				RCG: 'Malao',
				Recipe: [{ Recipe: 'Malaury is the best' }]
			})
		).toEqual(false);
		expect(
			verif.CreateFormShem.validateSync({
				Name: 'malaury',
				RCG: '100',
				Recipe: [{ Recipe: 'Malaury is the best' }]
			})
		).toEqual(false);
		expect(
			verif.CreateFormShem.validateSync({
				Name: 'malaury',
				RCG: '-20',
				Recipe: [{ Recipe: 'Malaury is the best' }]
			})
		).toEqual(false);
		expect(verif.CreateFormShem.validateSync({ Name: 'malaury', RCG: '10', Recipe: [{ Recipe: '' }] })).toEqual(
			false
		);
		expect(
			verif.CreateFormShem.validateSync({
				Name: 'malaury',
				RCG: '10',
				Recipe: [{ Recipe: 'Malaury is the best' }]
			})
		).toEqual(true);*/
	});
});

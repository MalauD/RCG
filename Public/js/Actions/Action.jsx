export const SAVE_USER = 'SAVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function SaveUser(User) {
	return {
		type: SAVE_USER,
		Name: User.Name,
		Rank: User.Rank,
		Mail: User.Mail
	};
}

export function LogoutUser() {
	return {
		type: LOGOUT_USER,
		Name: '',
		Rank: '',
		Mail: ''
	};
}

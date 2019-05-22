import { SAVE_USER, LOGOUT_USER } from '../Actions/Action';

const InitialState = {
	IsLogged: false,
	Name: '',
	Rank: '',
	Mail: ''
};

export default function AccountReducer(state = InitialState, action) {
	switch (action.type) {
		case SAVE_USER:
			return Object.assign({}, state, {
				IsLogged: true,
				Name: action.Name,
				Rank: action.Rank,
				Mail: action.Mail
			});
		case LOGOUT_USER:
			return Object.assign({}, state, {
				IsLogged: false,
				Name: action.Name,
				Rank: action.Rank,
				Mail: action.Mail
			});
		default:
			return state;
	}
}

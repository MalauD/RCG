import { SAVE_USER, LOGOUT_USER, UPDATE_IMAGE } from '../Actions/Action';

const InitialState = {
	IsLogged: false,
	Name: '',
	Rank: '',
	Mail: '',
	ImageLink: '/FoodImage/DefaultAccount.png'
};

export default function AccountReducer(state = InitialState, action) {
	switch (action.type) {
		case SAVE_USER:
			return Object.assign({}, state, {
				IsLogged: true,
				Name: action.Name,
				Rank: action.Rank,
				Mail: action.Mail,
				ImageLink: action.ImageLink
			});
		case LOGOUT_USER:
			return Object.assign({}, state, {
				IsLogged: false,
				Name: action.Name,
				Rank: action.Rank,
				Mail: action.Mail,
				ImageLink: action.ImageLink
			});
		case UPDATE_IMAGE:
			return Object.assign({}, state, {
				ImageLink: action.ImageLink
			});
		default:
			return state;
	}
}

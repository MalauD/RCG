import { ADMIN, SEARCH } from '../Constants/SearchTypes';

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

export const REQUEST_FOOD_SEARCH = 'REQUEST_FOOD_SEARCH';
export const REQUEST_UNCHECKED_FOOD = 'REQUEST_UNCHECKED_FOOD';
export const REQUEST_CONTRIB_FOOD = 'REQUEST_CONTRIB_FOOD';
export const RECEIVE_FOOD = 'RECEIVE_FOOD_SEARCH';
export const FAIL_FOOD = 'FAIL_FOOD';

export function RequestFoodSearch(SearchQuery) {
	return {
		type: REQUEST_FOOD_SEARCH,
		SearchQuery: SearchQuery,
		RequestedAt: Date.now()
	};
}

export function RequestUncheckedFood() {
	return {
		type: REQUEST_UNCHECKED_FOOD,
		RequestedAt: Date.now()
	};
}

export function RequestContribFood() {
	return {
		type: REQUEST_CONTRIB_FOOD,
		RequestedAt: Date.now()
	};
}

export function ReceiveFood(FoodsResult) {
	return {
		type: RECEIVE_FOOD,
		FoodsResult,
		ReceivedAt: Date.now()
	};
}

export function FailFood(err) {
	return {
		type: FAIL_FOOD,
		SearchError: err,
		FailAt: Date.now()
	};
}

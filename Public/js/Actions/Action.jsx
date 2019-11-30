import { ADMIN, SEARCH } from '../Constants/SearchTypes';

export const SAVE_USER = 'SAVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';

export function SaveUser(User) {
	return {
		type: SAVE_USER,
		Name: User.name,
		Rank: User.rank,
		Mail: User.mail,
		ImageLink: User.ImageLink
	};
}

export function LogoutUser() {
	return {
		type: LOGOUT_USER,
		Name: '',
		Rank: '',
		Mail: '',
		ImageLink: ''
	};
}

export function UpdateImage(ImageLink) {
	return {
		type: UPDATE_IMAGE,
		ImageLink
	};
}

export const REQUEST_FOOD_SEARCH = 'REQUEST_FOOD_SEARCH';
export const REQUEST_UNCHECKED_FOOD = 'REQUEST_UNCHECKED_FOOD';
export const REQUEST_CONTRIB_FOOD = 'REQUEST_CONTRIB_FOOD';
export const REQUEST_USER_CONTRIB_FOOD = 'REQUEST_USER_CONTRIB_FOOD';
export const REQUEST_FOOD_OF_INGREDIENT = 'REQUEST_FOOD_OF_INGREDIENT';
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

export function RequestUserContribFood() {
	return {
		type: REQUEST_USER_CONTRIB_FOOD,
		RequestedAt: Date.now()
	};
}

export function RequestFoodOfIngredient() {
	return {
		type: REQUEST_FOOD_OF_INGREDIENT,
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

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const CHANGE_QTY = 'CHANGE_QTY';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';

export function AddIngredient(Ingredient, ContextType) {
	return {
		type: ADD_INGREDIENT,
		Ingredient,
		ContextType
	};
}

export function RemoveIngredient(id, ContextType) {
	return {
		type: REMOVE_INGREDIENT,
		id,
		ContextType
	};
}

export function ChangeQty(id, qty) {
	return {
		type: CHANGE_QTY,
		id,
		qty
	};
}

export function UpdateIngredients(IngredientList) {
	return {
		type: UPDATE_INGREDIENTS,
		IngredientList
	};
}

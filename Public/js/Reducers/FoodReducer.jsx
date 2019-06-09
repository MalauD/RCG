import { ADD_INGREDIENT, REMOVE_INGREDIENT, CHANGE_QTY, UPDATE_INGREDIENTS } from '../Actions/Action';
import { VIEW } from '../Constants/FoodConstants';

const InitialState = {
	IngredientList: [],
	ContextType: ''
};

function CheckExistingId(arr, id) {
	for (const element in arr) {
		if (arr[element].id == id) return true;
	}
	return false;
}

function ModifyArray(arr, id, qty) {
	var newArr = [];
	for (const e in arr) {
		if (arr[e].id == id) {
			newArr.push(
				Object.assign({}, arr[e], {
					qty
				})
			);
		} else {
			newArr.push(arr[e]);
		}
	}
	return newArr;
}

export default function FoodReducer(state = InitialState, action) {
	switch (action.type) {
		case ADD_INGREDIENT:
			if (!CheckExistingId(state.IngredientList, action.Ingredient.id) || state.IngredientList.length == 0) {
				if (state.ContextType == action.ContextType || action.ContextType == '') {
					return Object.assign({}, state, {
						IngredientList: [...state.IngredientList, action.Ingredient], //Add element to array using spread op and return new array
						ContextType: action.ContextType
					});
				} else {
					return Object.assign({}, state, {
						IngredientList: [action.Ingredient],
						ContextType: action.ContextType
					});
				}
			} else return state;
		case REMOVE_INGREDIENT:
			if (CheckExistingId(state.IngredientList, action.id)) {
				return Object.assign({}, state, {
					IngredientList: state.IngredientList.filter(e => e.id !== action.id), //Remove all without mutating
					ContextType: action.ContextType
				});
			}
		case CHANGE_QTY:
			if (CheckExistingId(state.IngredientList, action.id)) {
				return Object.assign({}, state, {
					IngredientList: ModifyArray(state.IngredientList, action.id, action.qty)
				});
			}
		case UPDATE_INGREDIENTS:
			return Object.assign({}, state, {
				IngredientList: action.IngredientList,
				ContextType: VIEW
			});
		default:
			return state;
	}
}

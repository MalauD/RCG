import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import FoodSearchReducer from './FoodSearchReducer';

export default combineReducers({
	AccountReducer,
	FoodSearchReducer
});

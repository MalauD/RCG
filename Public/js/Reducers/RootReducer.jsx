import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import FoodSearchReducer from './FoodSearchReducer';

import FoodReducer from './FoodReducer';

export default combineReducers({
	AccountReducer,
	FoodSearchReducer,
	FoodReducer
});

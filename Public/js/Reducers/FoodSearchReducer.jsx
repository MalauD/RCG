import {
	REQUEST_FOOD_SEARCH,
	RECEIVE_FOOD,
	FAIL_FOOD,
	REQUEST_UNCHECKED_FOOD,
	REQUEST_CONTRIB_FOOD
} from '../Actions/Action';
import { SEARCH, ADMIN, CONTRIB } from '../Constants/SearchTypes';

const InitialState = {
	SearchQuery: '',
	IsCheckedFood: true,
	RequestedAt: '',
	SearchType: '',

	IsFetching: false,
	FoodsResult: [],

	ReceivedAt: '',

	Errors: {
		SearchError: '',
		FailAt: ''
	}
};

export default function FoodSearchReducer(state = InitialState, action) {
	switch (action.type) {
		case REQUEST_FOOD_SEARCH:
			return Object.assign({}, state, {
				IsFetching: true,
				SearchQuery: action.SearchQuery,
				RequestedAt: action.RequestedAt,
				IsCheckedFood: true,
				SearchType: SEARCH,
				Errors: {}
			});
		case REQUEST_UNCHECKED_FOOD:
			return Object.assign({}, state, {
				IsFetching: true,
				SearchQuery: '',
				RequestedAt: action.RequestedAt,
				IsCheckedFood: false,
				SearchType: ADMIN,
				Errors: {}
			});
		case REQUEST_CONTRIB_FOOD:
			return Object.assign({}, state, {
				IsFetching: true,
				SearchQuery: '',
				RequestedAt: action.RequestedAt,
				IsCheckedFood: true,
				SearchType: CONTRIB,
				Errors: {}
			});
		case RECEIVE_FOOD:
			return Object.assign({}, state, {
				IsFetching: false,
				FoodsResult: action.FoodsResult,
				ReceivedAt: action.ReceivedAt,
				Errors: {}
			});

		case FAIL_FOOD:
			return Object.assign({}, state, {
				IsFetching: false,
				FoodsResult: [],
				Errors: {
					SearchError: action.SearchError,
					FailAt: action.FailAt
				}
			});

		default:
			return state;
	}
}

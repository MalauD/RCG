import React from 'react';
import queryString from 'query-string';
import FoodContainer from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/FoodContainer';
import axios from 'axios';

import { connect } from 'react-redux';
import { RequestFoodSearch, ReceiveFood, FailFood } from '../../Actions/Action';

import { SEARCH } from '../../Constants/SearchTypes';

const mapStateToProps = state => {
	return { IsFetching: state.FoodSearchReducer.IsFetching, SearchQuery: state.FoodSearchReducer.SearchQuery };
};

function mapDispatchToProps(dispatch) {
	return {
		RequestFoodSearch: Search => dispatch(RequestFoodSearch(Search)),
		ReceiveFood: FoodsResult => dispatch(ReceiveFood(FoodsResult)),
		FailFood: err => dispatch(FailFood(err))
	};
}

class SearchPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<FoodContainer SearchTypeParent={SEARCH} />
			</div>
		);
	}

	componentDidMount = () => {
		//This is called on first render of page
		this.APISearch();
	};

	componentDidUpdate = () => {
		//This is called when the "url update"
		this.APISearch();
	};

	APISearch = () => {
		//Get qury params and make an api search
		const values = queryString.parse(this.props.location.search);
		//Check if the client is not currently fetching stg and also sea if the search query has changed
		if (!this.props.IsFetching && values.q != this.props.SearchQuery) {
			//dispatch to redux a request action before performing an api call
			this.props.RequestFoodSearch(values.q);
			//perform the call
			axios
				.get('/foods/name/' + values.q)
				.then(res => {
					//On api rep send to redux the api result
					this.props.ReceiveFood(res.data);
				})
				.catch(res => {
					//On error, send error to redux
					this.props.FailFood(res.message);
				});
		}
	};
}

const SearchPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchPageConnected);

export default SearchPage;

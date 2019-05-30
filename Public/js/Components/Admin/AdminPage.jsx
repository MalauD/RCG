import React from 'react';
import FoodContainer from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/FoodContainer';
import { ADMIN } from '../../Constants/SearchTypes';
import axios from 'axios';

import { connect } from 'react-redux';
import { RequestUncheckedFood, ReceiveFood, FailFood } from '../../Actions/Action';

const mapStateToProps = state => {
	return { IsFetching: state.FoodSearchReducer.IsFetching };
};

function mapDispatchToProps(dispatch) {
	return {
		RequestUncheckedFood: () => dispatch(RequestUncheckedFood()),
		ReceiveFood: FoodsResult => dispatch(ReceiveFood(FoodsResult)),
		FailFood: err => dispatch(FailFood(err))
	};
}

class AdminPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="AccountContent">
				<p className="ContribTitle">Administration flow</p>
				<p id="AccountMail">Please check this card</p>
				<FoodContainer SearchTypeParent={ADMIN} />
			</div>
		);
	}

	componentDidMount = () => {
		this.APIRequest();
	};

	APIRequest = () => {
		//Check if the client isn't currently fetching stg
		if (!this.props.IsFetching) {
			//Dispatch a unchecked food request for REDUX
			this.props.RequestUncheckedFood();
			//Perform the api call
			axios
				.get('/foods/unchecked')
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

const AdminPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminPageConnected);

export default AdminPage;

import React from 'react';
import FoodContainer from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/FoodContainer';
import { Link } from 'react-router-dom';
import { CONTRIB } from '../../Constants/SearchTypes';
import axios from 'axios';

import { connect } from 'react-redux';
import { ReceiveFood, FailFood, RequestContribFood } from '../../Actions/Action';

const mapStateToProps = state => {
	return { IsFetching: state.FoodSearchReducer.IsFetching };
};

function mapDispatchToProps(dispatch) {
	return {
		RequestContribFood: () => dispatch(RequestContribFood()),
		ReceiveFood: FoodsResult => dispatch(ReceiveFood(FoodsResult)),
		FailFood: err => dispatch(FailFood(err))
	};
}

class ContribPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<div className="AccountContent">
					<p className="ContribTitle">Your Contributions</p>
					<FoodContainer SearchTypeParent={CONTRIB} />
					<Link to="/Create" style={{ left: '50%' }} className="LoginLink">
						It seems that you reach the end of your contributions. Click to create new ones
					</Link>
				</div>
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
			this.props.RequestContribFood();
			//Perform the api call
			axios
				.get('/Meals/Contrib')
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

const ContribPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ContribPageConnected);

export default ContribPage;

import React from 'react';
import Axios from 'axios';
import FoodContainer from '../FoodPage/FoodContainer';
import { USER_CONTRIB } from '../../Constants/SearchTypes';
import {
	RequestUserContribFood,
	ReceiveFood,
	FailFood
} from '../../Actions/Action';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return { IsFetching: state.FoodSearchReducer.IsFetching };
};

function mapDispatchToProps(dispatch) {
	return {
		RequestUserContribFood: () => dispatch(RequestUserContribFood()),
		ReceiveFood: FoodsResult => dispatch(ReceiveFood(FoodsResult)),
		FailFood: err => dispatch(FailFood(err))
	};
}

class UserPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: ''
		};
	}

	componentDidMount = () => {
		this.GetUser();
	};

	componentWillReceiveProps = () => {
		//url change (for params)
		this.GetUser();
	};

	GetUser() {
		if (!this.props.IsFetching) {
			this.props.RequestUserContribFood();
			Axios.get('/Account/Users/id/' + this.props.match.params.UserId)
				.then(res => {
					this.setState({ ApiResult: res.data });
					this.props.ReceiveFood(res.data.Contrib);
				})
				.catch(() => {
					this.setState({ ApiResult: '' });
					this.props.FailFood(res.message);
				});
		}
	}

	render() {
		return (
			<div>
				{this.state.ApiResult ? (
					<div className="AccountContent">
						<div className="RowContainer">
							<img
								src={
									this.state.ApiResult.ImageLink
										? this.state.ApiResult.ImageLink
										: '/FoodImage/DefaultAccount.png'
								}
								className="AccountImage"
							/>
							<div>
								<p id="AccountName">
									{this.state.ApiResult.name}
								</p>
								<p id="AccountMail">
									{this.state.ApiResult.mail}
								</p>
								<p id="AccountMail">
									Rank + {this.state.ApiResult.rank}
								</p>
							</div>
						</div>
						<div>
							<p
								className="FoodLabel"
								style={{
									marginTop: '8px',
									fontSize: '1.5em'
								}}
							>
								Contributions
							</p>
							<FoodContainer SearchTypeParent={USER_CONTRIB} />
						</div>
					</div>
				) : (
					<div className="Spinner">
						<object type="image/svg+xml" data="spinner.svg">
							Your browser does not support SVG
						</object>
					</div>
				)}
			</div>
		);
	}
}

const UserPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPageConnected);

export default UserPage;

import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import FoodContainer from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/FoodContainer';
import { Link } from 'react-router-dom';
import { FOOD_INGREDIENT } from '../../Constants/SearchTypes';
import { connect } from 'react-redux';
import { RequestFoodOfIngredient, ReceiveFood, FailFood } from '../../Actions/Action';

const mapStateToProps = state => {
	return { IsFetching: state.FoodSearchReducer.IsFetching };
};

function mapDispatchToProps(dispatch) {
	return {
		RequestFoodOfIngredient: Search => dispatch(RequestFoodOfIngredient()),
		ReceiveFood: FoodsResult => dispatch(ReceiveFood(FoodsResult)),
		FailFood: err => dispatch(FailFood(err))
	};
}

class IngredientPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: ''
		};
	}

	componentDidMount() {
		//Get query params for checked
		this.ApiFetch();
		this.IngredientApiSearch();
	}

	ApiFetch = () => {
		Axios.get('/Ingredients/Search/id/' + this.props.match.params.id)
			.then(res => {
				this.setState({ ApiResult: res.data });
			})
			.catch(err => {
				//TODO Redirect to error perm
				this.props.history.push('/');
			});
	};

	IngredientApiSearch = () => {
		if (!this.props.IsFetching) {
			this.props.RequestFoodOfIngredient();
			Axios.post('/Meals/ByIngredient/', { IngredientsId: [this.props.match.params.id] })
				.then(res => {
					this.props.ReceiveFood(res.data);
				})
				.catch(res => {
					this.props.FailFood(res.message);
				});
		}
	};

	render() {
		return (
			<div>
				<div className="AccountContent">
					<p className="FoodPageName">{this.state.ApiResult.FOOD_NAME}</p>
					<div className="RowContainer">
						<p
							className="FoodLabel"
							style={{
								marginTop: '0px',
								marginBottom: '15px',
								fontSize: '1.2em',
								borderBottomColor: 'transparent'
							}}
						>
							{this.state.ApiResult.SCIENTIFIC_NAME ? this.state.ApiResult.SCIENTIFIC_NAME : 'No Scientific name for this ingredient'}
						</p>
						<div className="Spreader" />
						<div className="Breadcrumbs">
							<Link className="BreadcrumbsItem" to={'/Ingredient/Group/' + this.state.ApiResult.FGROUP}>
								{this.state.ApiResult.FGROUP}
							</Link>
							<p className="BreadcrumbsItem">{' / '}</p>
							<Link className="BreadcrumbsItem" to={'/Ingredient/SubGroup/' + this.state.ApiResult.SUB_FGROUP}>
								{this.state.ApiResult.SUB_FGROUP}
							</Link>
						</div>
					</div>
					<p
						style={{
							marginTop: '0px',
							marginBottom: '15px',
							fontSize: '1.4em'
						}}
						className="FoodLabel"
					>
						Meals including this ingredient
					</p>
					<FoodContainer SearchTypeParent={FOOD_INGREDIENT} />
				</div>
			</div>
		);
	}
}

const IngredientPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(IngredientPageConnected);

export default withRouter(IngredientPage);

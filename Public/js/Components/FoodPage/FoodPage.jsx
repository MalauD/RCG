import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import StepRecipeElement from './StepRecipeElement';
import RCGCounter from './RCGCounter';
import AdminTools from '../Admin/AdminTools';
import IngredientsList from '../Creation/IngredientsList';

import { connect } from 'react-redux';
import { UpdateIngredients } from '../../Actions/Action';

const mapStateToProps = state => {
	return { Rank: state.AccountReducer.Rank };
};

function mapDispatchToProps(dispatch) {
	return {
		UpdateIngredients: IngredientList => dispatch(UpdateIngredients(IngredientList))
	};
}

class FoodPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: '',
			IsCheckedFood: ''
		};
	}

	componentDidMount() {
		//Get query params for checked
		this.ApiFetch();
	}

	componentWillReceiveProps() {
		//On props change fetch (when the query string change)
		this.ApiFetch();
	}

	ApiFetch() {
		const values = queryString.parse(this.props.location.search);
		console.log(values);
		this.setState({ IsCheckedFood: values.Checked });
		//Get api res for food with specified id and checked.
		axios
			.get('/foods/id/' + this.props.match.params.idFoods + '?Checked=' + values.Checked)
			.then(res => {
				//Set state to the api response
				this.setState({ ApiResult: res.data });
				if (res.data.Ingredients) this.props.UpdateIngredients(res.data.Ingredients);
			})
			.catch(err => {
				//TODO Redirect to error perm
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<div>
				<div className="AccountContent">
					{this.state.ApiResult && (
						<div className="FoodPage">
							<div className="RowContainer">
								<div className="FoodDesc">
									<p className="FoodPageName">{this.state.ApiResult.Name}</p>
									{/* <RCGCounter
								FoodInfo={{ RCG: this.state.ApiResult.RCG, idFoods: this.state.ApiResult.idFoods }}
							/> */}

									{this.state.ApiResult.PrepTime && (
										<p style={{ marginTop: '10px' }} className="MealStep">
											{this.state.ApiResult.PrepTime} min - For {this.state.ApiResult.People}{' '}
											people
										</p>
									)}

									<div className="RCGCounter">
										<p> RCG </p>
										<p>{this.state.ApiResult.RCG}</p>
									</div>
								</div>
								<div className="RowContainer">
									<img src={this.state.ApiResult.ImageLink} className="ImageFood" />
								</div>
							</div>

							<div className="RowContainer" style={{ marginTop: '20px' }}>
								{this.state.ApiResult.Ingredients && (
									<div>
										<p
											className="FoodLabel"
											style={{ marginTop: '8px', marginBottom: '15px', fontSize: '1.5em' }}
										>
											Ingredients for {this.state.ApiResult.People} people
										</p>
										<IngredientsList IsCreaction={false} />
									</div>
								)}
								<div>
									<p className="FoodLabel" style={{ marginTop: '8px', fontSize: '1.5em' }}>
										Recipe
									</p>
									{this.state.ApiResult.Content.map(Step => {
										return (
											<StepRecipeElement
												key={Step.Number}
												StepNumber={Step.Number}
												StepRecipe={Step.Recipe}
											/>
										);
									})}
								</div>
							</div>
							{this.props.Rank > 100 && (
								<AdminTools
									IsChecked={this.state.IsCheckedFood}
									idFoods={this.props.match.params.idFoods}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}

const FoodPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(FoodPageConnected);

export default FoodPage;

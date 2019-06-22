import React from 'react';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';
import MealStepCreator from './MealStepCreator';
import FoodListSelector from './FoodListSelector';
import IngredientsList from './IngredientsList';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		IngredientList: state.FoodReducer.IngredientList
	};
};

class CreatePageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			MealName: '',
			MealRCG: '',
			MealErrorForm: '',
			PopupOpen: '',
			MealRecipeSteps: [],
			MealPrepTime: '',
			MealIngredientsPeople: ''
		};
		this.fileInput = React.createRef();
		this.FormValidationShem = yup.object().shape({
			MealName: yup.string('Meal Name should be a string').required('Meal name is required'),
			MealPrepTime: yup
				.number('Meal preparation time must be a number')
				.required('Meal preparation time is missing')
				.positive('Meal preparation time must be positive')
				.integer('Meal preparation time must be an integer')
				.min(0),
			MealIngredientsPeople: yup
				.number('Meal people must be a number')
				.required('Meal people is missing')
				.positive('Meal people must be positive')
				.integer('Meal people must be an integer')
				.min(0),
			MealRCG: yup
				.number('Meal RCG should be a number')
				.required('Meal RCG is required')
				.positive('Meal RCG should be a number')
				.integer('Meal RCG should be a number')
				.min(0)
				.max(20),
			MealRecipeSteps: yup
				.array()
				.of(
					yup.object({
						Recipe: yup
							.string()
							.min(10)
							.max(500)
							.required('Meal recipe is required')
					})
				)
				.required('Recipe is required'),
			IngredientList: yup
				.array()
				.of(
					yup.object({
						qty: yup
							.string('Ingredient quantity must be a string')
							.required('Ingredient quantity is required')
					})
				)
				.required('A list of ingredient is required')
		});
	}
	render() {
		return (
			<div>
				<div className="AccountContent">
					<form onSubmit={this.OnSubmitClick}>
						<p className="ContribTitle">Create a new meal</p>
						<div className="CreateContent">
							<p className="LoginLabel" style={{ marginTop: '4px' }}>
								Meal Description
							</p>
							<input
								type="text"
								name="Name"
								className="CreateElement"
								style={{ width: '50%' }}
								placeholder="The title of the meal"
								onChange={this.OnChangeMealName}
							/>
							<input
								className="CreateElement"
								name="RCG"
								placeholder="RCG rating (0 - 20)"
								style={{ width: '25%' }}
								type="number"
								min="0"
								max="20"
								onChange={this.OnChangeMealRCG}
							/>

							<input
								className="CreateElement"
								name="PreparationTime"
								placeholder="Preparation time (in min)"
								style={{ width: '25%' }}
								type="number"
								min="0"
								onChange={this.OnChangeMealPrepTime}
							/>

							<MealStepCreator
								OnElementAdded={elementsarray => this.setState({ MealRecipeSteps: elementsarray })}
							/>
							<p className="LoginLabel" style={{ marginTop: '8px' }}>
								Select ingredients
							</p>
							<input
								className="CreateElement"
								name="NmberOfpers"
								placeholder="For how many people ?"
								style={{ width: '25%' }}
								type="number"
								min="0"
								onChange={this.OnChangeMealPers}
							/>
							<div className="RowContainer" style={{ margin: '10px' }}>
								<FoodListSelector />
								<IngredientsList IsCreation={true} />
							</div>
							<p className="LoginLabel" style={{ marginTop: '8px' }}>
								Upload an image
							</p>
							<input
								type="file"
								className="UploadMeal"
								accept="image/*"
								name="ImageFile"
								ref={this.fileInput}
							/>
							<input
								type="submit"
								style={{ marginBottom: '10px', borderRadius: '5px' }}
								className="LoginButton"
								value="Submit"
							/>
							<span className="SpanError">{this.state.MealErrorForm}</span>
						</div>
					</form>
				</div>
			</div>
		);
	}
	//TODO PB with submition (event missing) => check git repo
	OnChangeMealName = e => {
		this.setState({ MealName: e.target.value });
	};

	OnChangeMealRCG = e => {
		this.setState({ MealRCG: e.target.value });
	};

	OnChangeMealPrepTime = e => {
		this.setState({ MealPrepTime: e.target.value });
	};

	OnChangeMealPers = e => {
		this.setState({ MealIngredientsPeople: e.target.value });
	};

	OnSubmitClick = e => {
		e.preventDefault();
		// validate form using yup
		this.SubmitForm();
	};
	//TODO Handle empty fields

	SubmitForm() {
		this.FormValidationShem.validate(
			Object.assign({}, this.state, {
				IngredientList: this.props.IngredientList
			})
		)
			.then(() => {
				console.trace('valid ok');
				if (this.fileInput.current.files[0]) {
					//Create a form
					var data = new FormData();
					data.append('ImageFile', this.fileInput.current.files[0]);
					data.append('Name', this.state.MealName);
					data.append('RCG', this.state.MealRCG);
					data.append('Recipe', JSON.stringify(this.state.MealRecipeSteps));
					data.append('PrepTime', this.state.MealPrepTime);
					data.append('People', this.state.MealIngredientsPeople);
					//! Remove unnecessary items (NAME SCI_NAME)
					data.append('Ingredients', JSON.stringify(this.props.IngredientList));

					//Send datas to the server
					fetch('/Meals/Create', {
						method: 'POST',
						body: data
					}).then(result => {
						//If there is no html error redirect to the homepage (user logged in)
						// Other wise display errors
						if (result.ok) {
							if (result.json().CreateStatus) {
								this.props.history.push('/');
							} else {
								return;
							}
						}
					});
				} else {
					this.setState({ MealErrorForm: 'No image provided' });
				}
			})
			.catch(err => {
				this.setState({ MealErrorForm: err.errors[0] });
			});
	}
}

const CreatePage = connect(mapStateToProps)(CreatePageConnected);

export default withRouter(CreatePage);

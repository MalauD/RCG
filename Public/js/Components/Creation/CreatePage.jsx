import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MealStepCreator from './MealStepCreator';
import FoodListSelector from './FoodListSelector';

class CreatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			MealName: '',
			MealRCG: '',
			MealErrorForm: '',
			PopupOpen: '',
			MealRecipeSteps: []
		};
		this.fileInput = React.createRef();
		this.FormValidationShem = yup.object().shape({
			MealName: yup.string('Meal Name should be a string').required('Meal name is required'),
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
				.required('Recipe is required')
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
							<MealStepCreator
								OnElementAdded={elementsarray => this.setState({ MealRecipeSteps: elementsarray })}
							/>
							<p className="LoginLabel" style={{ marginTop: '8px' }}>
								Select ingredients
							</p>
							<FoodListSelector />
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

	OnSubmitClick = e => {
		e.preventDefault();
		// validate form using yup
		this.SubmitForm();
	};
	//TODO Handle empty fields

	SubmitForm() {
		this.FormValidationShem.validate(this.state)
			.then(() => {
				if (this.fileInput.current.files[0]) {
					//Create a form
					var data = new FormData();
					data.append('ImageFile', this.fileInput.current.files[0]);
					data.append('Name', this.state.MealName);
					data.append('RCG', this.state.MealRCG);
					data.append('Recipe', JSON.stringify(this.state.MealRecipeSteps));
					//Send datas to the server
					fetch('/Create', {
						method: 'POST',
						body: data
					}).then(result => {
						//If there is no html error redirect to the homepage (user logged in)
						// Other wise display errors
						if (result.ok) {
							if (result.json().CreateStatus) {
							} else {
								return;
							}
						}
					});
				}
			})
			.catch(err => {
				this.setState({ MealErrorForm: err.errors[0] });
			});
	}
}

export default CreatePage;

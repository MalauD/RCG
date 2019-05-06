import React from 'react';
import * as yup from 'yup';
import Popup from 'reactjs-popup';

class CreatePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			MealName: '',
			MealRCG: '',
			MealRecipe: '',
			MealErrorForm: '',
			PopupOpen: ''
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
			MealRecipe: yup
				.string('Meal Recipe should be a string')
				.required('Meal Recipe is required')
				.min(10)
				.max(2000)
		});
	}
	render() {
		return (
			<div>
				<div className="AccountContent">
					<form onSubmit={this.OnSubmitClick}>
						<p className="ContribTitle">Create a new meal</p>
						<div className="CreateContent">
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
							<textarea
								name="Recipe"
								type="text"
								style={{ height: '20rem' }}
								className="CreateElement"
								placeholder="Enter your recipe for this meal"
								onChange={this.OnChangeMealRecipe}
							/>
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
				<Popup
					className="AccountContent"
					open={this.state.PopupOpen}
					closeOnDocumentClick
					onClose={this.closeModal}
				>
					<div>
						<p className="ContribTitle">Thank you for the contribution</p>
						<p style={{ textAlign: 'center' }}>It will be one the website very soon</p>
						<button
							className="LoginButton"
							onClick={() => {
								this.props.history.push('/');
							}}
						>
							Close
						</button>
					</div>
				</Popup>
			</div>
		);
	}

	closeModal = () => {
		this.setState({ PopupOpen: false });
	};

	openModal = () => {
		this.setState({ PopupOpen: true });
	};

	OnChangeMealName = e => {
		this.setState({ MealName: e.target.value });
	};

	OnChangeMealRCG = e => {
		this.setState({ MealRCG: e.target.value });
	};

	OnChangeMealRecipe = e => {
		this.setState({ MealRecipe: e.target.value });
	};

	OnSubmitClick = e => {
		e.preventDefault();
		// validate form using yup
		this.FormValidationShem.validate(this.state)
			.then(() => {
				if (this.fileInput.current.files[0]) {
					//Create a form
					var data = new FormData();
					data.append('ImageFile', this.fileInput.current.files[0]);
					data.append('Name', this.state.MealName);
					data.append('RCG', this.state.MealRCG);
					data.append('Recipe', this.state.MealRecipe);
					//Send datas to the server
					fetch('/Create', {
						method: 'POST',
						body: data
					}).then(result => {
						//If there is no html error redirect to the homepage (user logged in)
						// Other wise display errors
						if (result.ok) {
							if (result.json().CreateStatus) {
								//TODO Display UI for ok
								this.openModal();
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
	};
	//TODO Handle empty fields

	ValidateForm = () => {};
}

export default CreatePage;

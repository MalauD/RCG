import React from 'react';
import StepRecipeElement from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/StepRecipeElement';

class MealStepCreator extends React.Component {
	constructor(props) {
		super(props);
		this.state = { MealRecipe: '', MealRecipeSteps: [], MealStepNumber: 1 };
	}
	render() {
		return (
			<React.Fragment>
				<p className="LoginLabel" style={{ marginTop: '8px' }}>
					Enter recipe steps
				</p>
				<textarea
				
					name="Recipe"
					type="text"
					style={{ height: '5rem' }}
					className="CreateElement"
					placeholder="Enter your recipe step for this meal"
					onChange={this.OnChangeMealRecipe}
				/>
				<button
					type="button"
					className="AppendMealStep"
					onClick={this.OnAddStep}
				>
					Add a step
				</button>
				<p className="LoginLabel" style={{ marginTop: '8px' }}>
					Current recipe
				</p>
				<div>
					{this.state.MealRecipeSteps.map(Step => {
						return (
							<StepRecipeElement
								key={Step.Number}
								StepNumber={Step.Number}
								StepRecipe={Step.Recipe}
								IsCreation={true}
								HandleDelete={this.HandleDelete}
							/>
						);
					})}
				</div>
			</React.Fragment>
		);
	}

	OnChangeMealRecipe = e => {
		this.setState({ MealRecipe: e.target.value });
	};

	OnAddStep = () => {
			this.AppendMealStepToRecipe({
				Number: this.state.MealStepNumber,
				Recipe: this.state.MealRecipe
			});
			this.setState(prevState => ({
				MealStepNumber: prevState.MealStepNumber + 1,
				MealRecipe: ''
			}));
		}
	};


	HandleDelete = n => {
		this.setState({
			MealRecipeSteps: this.state.MealRecipeSteps.filter(
				obj => obj.Number != n
			)
		});
	};

	AppendMealStepToRecipe = step => {
		//Add step to state object using ES6 array modif (... and the value)
		this.setState(
			prevState => ({
				MealRecipeSteps: [...prevState.MealRecipeSteps, step]
			}),
			this.ElementAppended
		);
	};

	ElementAppended = () => {
		this.props.OnElementAdded(this.state.MealRecipeSteps);
	};
}

export default MealStepCreator;

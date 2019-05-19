import React from 'react';

class StepRecipeElement extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="RecipeStep">
				<p className="MealStep" style={{ fontSize: '2em' }}>
					{this.props.StepNumber}
				</p>
				<div className="vl" />
				<p className="MealStep">{this.props.StepRecipe}</p>
			</div>
		);
	}
}

export default StepRecipeElement;

import React from 'react';

class FoodElement extends React.Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		//render using the props (Like the api contnent)
		return (
			<div className="Card" onClick={this.OnElementClicked}>
				<img src={this.props.ImageLink} />
				<p>{this.props.Name}</p>
			</div>
		);
	};

	OnElementClicked = () => {
		this.props.OnClickFood(this.props.idFoods);
	};
}
export default FoodElement;

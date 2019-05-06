import React from 'react';
import { withRouter } from 'react-router-dom';

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
		//Redirect to /Food/<idFoods>
		this.props.history.push('/Food/' + this.props.idFoods);
	};
}
export default withRouter(FoodElement);

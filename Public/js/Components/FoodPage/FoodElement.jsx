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
				<div className="CardRCG">
					<p>{this.props.RCG}</p>
				</div>
				<img src={this.props.ImageLink} />
				<div className="RowContainer">
					<p>{this.props.Name}</p>
					<div style={{ flexGrow: 4 }} />
					{this.props.PrepTime && <p className="CardAttr">{this.props.PrepTime} min</p>}
				</div>
			</div>
		);
	};

	OnElementClicked = () => {
		//Redirect to /Food/<idFoods>
		//make a query string if the food is checked or not
		this.props.history.push('/Food/' + this.props.idFoods + '/Food?Checked=' + this.props.IsChecked);
	};
}
export default withRouter(FoodElement);

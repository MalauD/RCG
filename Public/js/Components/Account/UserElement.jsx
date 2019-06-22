import React from 'react';
import { withRouter } from 'react-router';

class UserElement extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="UserElement" onClick={this.OnElementClick}>
				<div className="RowContainer">
					<img
						src={
							this.props.Image
								? this.props.Image
								: '/FoodImage/DefaultAccount.png'
						}
						className="AccountImage"
					/>
					<div>
						<p>{this.props.Name}</p>
						<h1>{this.props.Rank}</h1>
					</div>
				</div>
			</div>
		);
	}

	OnElementClick = () => {
		this.props.history.push('/Users/' + this.props.UserId);
	};
}

export default withRouter(UserElement);

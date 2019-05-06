import React from 'react';
import FoodContainer from './FoodContainer';

class AdminPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.child = React.createRef();
	}
	render() {
		return (
			<div className="AccountContent">
				<p className="ContribTitle">Administration flow</p>
				<p id="AccountMail">Please check this card</p>
				<FoodContainer ref={this.child} />
			</div>
		);
	}

	componentDidMount = () => {
		fetch('/foods/unchecked')
			.then(res => res.json())
			.then(
				result => {
					//Call the food container method to show API result
					this.child.current.ShowResult(result);
				},
				err => {
					console.log(err);
				}
			);
	};
}

export default AdminPage;

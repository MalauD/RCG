import React from 'react';
import FoodContainer from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/FoodContainer';

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
					//Call the food container method to show API result and specify that it is uncheck food to do the proper redirection
					this.child.current.ShowResult(result, false);
				},
				err => {
					console.log(err);
				}
			);
	};
}

export default AdminPage;

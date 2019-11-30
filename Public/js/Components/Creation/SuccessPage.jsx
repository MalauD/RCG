import React from 'react';

class SuccessPage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div className="AccountContent">
					<p className="FoodLabel" style={{ fontSize: '22px' }}>
						Thank you !
					</p>
					<p className="FoodLabel" style={{ fontSize: '16px' }}>
						Your contribution will be soon visible to the public
					</p>
				</div>
			</div>
		);
	}
}

export default SuccessPage;

import React from 'react';

class FoodListSelector extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="FoodListSelector">
				<input type="text" placeholder="Search for food" />
				<div className="FoodListItemContainer">
					<div className="FoodListItem">
						<p>Kiwi</p>
						<p className="FoodListSec">Kiwi</p>
					</div>
					<div className="FoodListItem">
						<p>malo</p>
					</div>
				</div>
			</div>
		);
	}
}

export default FoodListSelector;

import React from 'react';
import FoodElement from './FoodElement';

class FoodContainer extends React.Component {
	constructor(props) {
		super(props);
		//State for the api result, that the parent give on API response.
		this.state = {
			ApiResult: 'undefined'
		};
	}

	render = () => {
		if (this.state.ApiResult != 'undefined') {
			//itterate over food items in the api response
			// Add FoodElement componenent with proper props
			let foodItems = this.state.ApiResult.map(fooditem => {
				return (
					<FoodElement
						Name={fooditem.Name}
						ImageLink={fooditem.ImageLink}
						key={fooditem.idFoods}
						idFoods={fooditem.idFoods}
						OnClickFood={this.ElementChildClicked}
					/>
				);
			});
			//return the div with all items inside.
			return <div>{foodItems}</div>;
		} else {
			//If the api response is empty display nothing.
			return <div />;
		}
	};

	ShowResult = res => {
		//This function is called by the parent with param the api response
		//This line will refresh the state variable for the Api result.
		this.setState({ ApiResult: res });
	};

	ElementChildClicked = FoodIdOfElement => {
		//When an element of the container is clicked (on the div)
		// FoodIDOfElement : the idFood from the api response (In the DB)
		// TODO Display food details
	};
}

export default FoodContainer;

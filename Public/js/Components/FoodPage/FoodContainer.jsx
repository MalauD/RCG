import React from 'react';
import FoodElement from './FoodElement';

class FoodContainer extends React.Component {
	constructor(props) {
		super(props);
		//State for the api result, that the parent give on API response.
		this.state = {
			ApiResult: 'undefined',
			IsCheckedFood: true,
			IsLoading: false
		};
	}

	render = () => {
		if (this.state.IsLoading) {
			return (
				<div className="Spinner">
					<object type="image/svg+xml" data="spinner.svg">
						Your browser does not support SVG
					</object>
				</div>
			);
		}
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
						IsChecked={this.state.IsCheckedFood}
						RCG={fooditem.RCG}
					/>
				);
			});
			//return the div with all items inside.
			return <div className="FoodContainer">{foodItems}</div>;
		} else {
			//If the api response is empty display nothing.
			return <div />;
		}
	};

	ShowResult = (res, IsChecked = true) => {
		//This function is called by the parent with param the api response
		//This line will refresh the state variable for the Api result.
		this.setState({ ApiResult: res, IsCheckedFood: IsChecked, IsLoading: false });
	};

	ShowSpinner = () => {
		this.setState({ IsLoading: true });
	};

	MakeSearch = Search => {
		//Show the Spinner
		this.ShowSpinner();
		// Call the api to retreive food
		fetch('/foods/name/' + Search)
			.then(res => res.json())
			.then(
				result => {
					//Call the food container method to show API result
					this.ShowResult(result);
				},
				err => {
					this.setState({ IsLoading: false });
					console.log(err);
				}
			);
	};
}

export default FoodContainer;

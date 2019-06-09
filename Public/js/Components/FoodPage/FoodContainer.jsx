import React from 'react';
import FoodElement from './FoodElement';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		FoodsResult: state.FoodSearchReducer.FoodsResult,
		IsFetching: state.FoodSearchReducer.IsFetching,
		IsCheckedFood: state.FoodSearchReducer.IsCheckedFood,
		SearchType: state.FoodSearchReducer.SearchType
	};
};

class FoodContainerConnected extends React.Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		if (this.props.IsFetching) {
			return (
				<div className="Spinner">
					<object type="image/svg+xml" data="spinner.svg">
						Your browser does not support SVG
					</object>
				</div>
			);
		} else if (this.props.FoodsResult && this.props.SearchType == this.props.SearchTypeParent) {
			//itterate over food items in the api response
			// Add FoodElement componenent with proper props

			let foodItems = this.props.FoodsResult.map(fooditem => {
				return (
					<FoodElement
						Name={fooditem.Name}
						ImageLink={fooditem.ImageLink}
						key={fooditem.idFoods}
						idFoods={fooditem.idFoods}
						IsChecked={this.props.IsCheckedFood}
						PrepTime={fooditem.PrepTime}
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
}

const FoodContainer = connect(mapStateToProps)(FoodContainerConnected);

export default FoodContainer;

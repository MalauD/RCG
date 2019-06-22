import React from 'react';
import FoodListItem from './FoodListItem';
import Axios from 'axios';
import { CREATION } from '../../Constants/FoodConstants';

class FoodListSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			FoodSearch: '',
			ApiResult: []
		};
	}
	render() {
		let itemsOfContainer = [];
		if (this.state.ApiResult.length > 0) {
			itemsOfContainer = this.state.ApiResult.map(foodlist => {
				return (
					<FoodListItem
						key={foodlist.ID}
						id={foodlist.ID}
						name={foodlist.FOOD_NAME}
						sciname={foodlist.SCIENTIFIC_NAME}
						Context={CREATION}
					/>
				);
			});
		}
		return (
			<div className="FoodListSelector">
				<input
					type="text"
					placeholder="Search for ingredients"
					value={this.state.FoodSearch}
					onKeyPress={this.HandleKeyPressed}
					onChange={this.HandleSearchChange}
				/>
				{itemsOfContainer.length > 0 && <div className="FoodListItemContainer">{itemsOfContainer}</div>}
			</div>
		);
	}

	HandleSearchChange = e => {
		//Event fired when the search bar is modified
		//This line will reasign the FoodSearch to the new value
		this.setState({ FoodSearch: e.target.value }, () => {
			this.ApiCall();
		});
	};

	HandleKeyPressed = e => {
		if (e.key == 'Enter') {
			e.preventDefault();
			//Make an api call to search for the field entered in the input
			this.ApiCall();
		}
	};

	ApiCall() {
		if (this.state.FoodSearch) {
			Axios.get('/Ingredients/Search/name/' + this.state.FoodSearch + '*')
				.then(res => {
					//On fetch complete copy rep to state
					this.setState({ ApiResult: res.data });
				})
				.catch(err => {
					console.log(err);
					this.setState({ ApiResult: [] });
				});
		} else {
			this.setState({ ApiResult: [] });
		}
	}
}

export default FoodListSelector;

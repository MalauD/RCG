import React from 'react';
import Axios from 'axios';
import { SVIEW } from '../../Constants/FoodConstants';
import FoodListItem from '../Creation/FoodListItem';

class IngredientGroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: '',
			IsGroup: undefined
		};
	}

	componentDidMount = () => {
		//determine if it about group or sub group
		// ! Creat a state variable for it ???
		if (this.props.location.pathname == '/Ingredient/Group/' + this.props.match.params.name) {
			var url = '/Ingredients/Group/name/' + this.props.match.params.name;
			this.setState({ IsGroup: true });
		} else {
			var url = '/Ingredients/SubGroup/name/' + this.props.match.params.name;
			this.setState({ IsGroup: true });
		}

		Axios.get(url)
			.then(res => {
				this.setState({ ApiResult: res.data });
			})
			.catch(res => {
				console.log(res);
			});
	};

	render() {
		if (this.state.ApiResult) {
			var items = this.state.ApiResult.map(ingredient => {
				return (
					<FoodListItem
						key={ingredient.ID}
						id={ingredient.ID}
						name={ingredient.FOOD_NAME}
						sciname={ingredient.SCIENTIFIC_NAME}
						Context={SVIEW}
					/>
				);
			});
		}

		return (
			<div className="AccountContent">
				<p className="FoodPageName">{this.props.match.params.name}</p>
				<div className="IngredientCollection">{items && items}</div>
			</div>
		);
	}
}

export default IngredientGroupPage;

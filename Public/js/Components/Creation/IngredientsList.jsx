import React from 'react';
import { connect } from 'react-redux';
import FoodListItem from './FoodListItem';
import { VIEW, CREATION_VIEW } from '../../Constants/FoodConstants';

const mapStateToProps = state => {
	return {
		IngredientList: state.FoodReducer.IngredientList,
		Context: state.FoodReducer.ContextType
	};
};

class IngredientsListConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let items;
		const contextOfInstance = this.props.IsCreation ? CREATION_VIEW : VIEW;
		if (this.props.IngredientList.length > 0 && this.props.Context == contextOfInstance) {
			items = this.props.IngredientList.map(ingredient => {
				return (
					<FoodListItem
						key={ingredient.id}
						id={ingredient.id}
						name={ingredient.name}
						sciname={ingredient.sciname}
						qty={ingredient.qty}
						Context={contextOfInstance}
					/>
				);
			});
			return <div className="IngredientsListContainer">{items}</div>;
		}
		return <div className="IngredientsListContainer" />;
	}
}

const IngredientsList = connect(mapStateToProps)(IngredientsListConnected);

export default IngredientsList;

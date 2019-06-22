import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AddIngredient, RemoveIngredient, ChangeQty } from '../../Actions/Action';
import { CREATION, CREATION_VIEW, VIEW, SVIEW } from '../../Constants/FoodConstants';
import Axios from 'axios';

function mapDispatchToProps(dispatch) {
	return {
		AddItem: (Ingredient, Context) => dispatch(AddIngredient(Ingredient, Context)),
		RemoveItem: (id, Context) => dispatch(RemoveIngredient(id, Context)),
		ChangeQty: (id, qty) => dispatch(ChangeQty(id, qty))
	};
}

class FoodListItemConnected extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			QtyInput: '',
			InputColor: 'red',
			name: '',
			sciname: ''
		};
	}

	componentDidMount = () => {
		if (this.props.Context == VIEW) {
			Axios.get('/Ingredients/Search/id/' + this.props.id)
				.then(res => {
					this.setState({ name: res.data.FOOD_NAME, sciname: res.data.SCIENTIFIC_NAME });
				})
				.catch(() => {});
		}
	};

	render() {
		return (
			<div className="FoodListItem">
				<div className="RowContainer" style={{ height: 'auto' }}>
					<div style={{ float: 'left', clear: 'both' }} onClick={this.OnElementClick}>
						<p>{this.props.Context != VIEW ? this.props.name : this.state.name}</p>
						<p className="FoodListSec">
							{this.props.Context != VIEW ? this.props.sciname : this.state.sciname}
						</p>
					</div>
					<div style={{ flexGrow: 4 }} />
					{this.props.Context == CREATION_VIEW && (
						<input
							style={{
								width: '80px',
								float: 'right',
								clear: 'both',
								flexGrow: '2',
								borderColor: this.state.InputColor
							}}
							className="QtyFoodItem"
							type="text"
							placeholder="Qty"
							value={this.state.QtyInput}
							onChange={this.HandleChange}
							onKeyPress={this.HandleKeyPress}
						/>
					)}
					{this.props.Context == VIEW && <p className="FoodListSec">{this.props.qty}</p>}
					{!(this.props.Context == VIEW || this.props.Context == SVIEW) && (
						<div style={{ float: 'right', clear: 'both', flexGrow: '2' }}>
							<p onClick={this.OnItemClick} className="plusSign">
								{this.props.Context == CREATION ? '+' : '-'}
							</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	OnItemClick = () => {
		if (this.props.Context == CREATION)
			this.props.AddItem(
				{ id: this.props.id, name: this.props.name, sciname: this.props.sciname },
				CREATION_VIEW
			);
		else if (this.props.Context == CREATION_VIEW) this.props.RemoveItem(this.props.id, CREATION_VIEW);
	};

	HandleKeyPress = e => {
		if (e.key == 'Enter') {
			e.preventDefault();
			//Add the ingredient quantity param to redux
			if (this.state.QtyInput) {
				this.props.ChangeQty(this.props.id, this.state.QtyInput);
				this.setState({ InputColor: 'green' });
			}
		}
	};

	OnElementClick = () => {
		this.props.history.push('/Ingredient/Name/' + this.props.id);
	};

	HandleChange = e => {
		this.setState({ QtyInput: e.target.value });
	};
}

const FoodListItem = connect(
	null,
	mapDispatchToProps
)(FoodListItemConnected);

export default withRouter(FoodListItem);

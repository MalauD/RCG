import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class IngredientPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: ''
		};
	}

	componentDidMount() {
		//Get query params for checked
		this.ApiFetch();
	}

	ApiFetch = () => {
		Axios.get('/Ingredients/Search/id/' + this.props.match.params.id)
			.then(res => {
				this.setState({ ApiResult: res.data });
			})
			.catch(err => {
				//TODO Redirect to error perm
				this.props.history.push('/');
			});
	};

	render() {
		return (
			<div>
				<div className="AccountContent">
					<p className="FoodPageName">{this.state.ApiResult.FOOD_NAME}</p>
					<div className="RowContainer">
						<p
							className="FoodLabel"
							style={{
								marginTop: '0px',
								marginBottom: '15px',
								fontSize: '1.3em',
								borderBottomColor: 'transparent'
							}}
						>
							{this.state.ApiResult.SCIENTIFIC_NAME
								? this.state.ApiResult.SCIENTIFIC_NAME
								: 'No Scientific name for this ingredient'}
						</p>
						<div className="Spreader" />
						<div className="Breadcrumbs">
							<Link className="BreadcrumbsItem" to={'/Ingredient/Group/' + this.state.ApiResult.FGROUP}>
								{this.state.ApiResult.FGROUP}
							</Link>
							<p className="BreadcrumbsItem">{' / '}</p>
							<Link
								className="BreadcrumbsItem"
								to={'/Ingredient/SubGroup/' + this.state.ApiResult.SUB_FGROUP}
							>
								{this.state.ApiResult.SUB_FGROUP}
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(IngredientPage);

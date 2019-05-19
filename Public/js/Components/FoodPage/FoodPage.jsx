import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import StepRecipeElement from './StepRecipeElement';
import RCGCounter from './RCGCounter';

class FoodPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: ''
		};
	}

	componentDidMount() {
		//Get query params for checked
		const values = queryString.parse(this.props.location.search);
		//Get api res for food with specified id and checked.
		axios
			.get('/foods/id/' + this.props.match.params.idFoods + '?Checked=' + values.Checked)
			.then(res => {
				//Set state to the api response
				this.setState({ ApiResult: res.data });
			})
			.catch(err => {
				//TODO Redirect to error perm
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<div>
				<div className="AccountContent">
					{this.state.ApiResult && (
						<div className="FoodPage">
							<p className="FoodPageName">{this.state.ApiResult.Name}</p>
							{/* <RCGCounter
								FoodInfo={{ RCG: this.state.ApiResult.RCG, idFoods: this.state.ApiResult.idFoods }}
							/> */}

							<div className="RCGCounter">
								<p> RCG </p>
								<p>{this.state.ApiResult.RCG}</p>
							</div>

							<img src={this.state.ApiResult.ImageLink} className="ImageFood" />
							<br />
							<p className="FoodLabel" style={{ marginTop: '8px', fontSize: '1.5em' }}>
								Recipe
							</p>
							<div>
								{this.state.ApiResult.Content.map(Step => {
									return (
										<StepRecipeElement
											key={Step.Number}
											StepNumber={Step.Number}
											StepRecipe={Step.Recipe}
										/>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default FoodPage;

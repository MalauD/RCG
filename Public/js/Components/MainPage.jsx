import React from 'react';
import Axios from 'axios';

import FoodElement from './FoodPage/FoodElement';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: []
		};
	}

	render = () => {
		return (
			<div>
				<div className="BackgroundContainer">
					<div className="textContainer">
						<h1>Need a good meal right away ?</h1>
						<div className="Spreader" />
						{this.state.ApiResult.length > 0 && (
							<FoodElement
								idFoods={this.state.ApiResult[0].idFoods}
								style={{ float: 'right' }}
								Name={this.state.ApiResult[0].Name}
								ImageLink={this.state.ApiResult[0].ImageLink}
								RCG={this.state.ApiResult[0].RCG}
								PrepTime={this.state.ApiResult[0].PrepTime}
								IsChecked={true}
							/>
						)}
					</div>
					<div className="textContainer">
						{this.state.ApiResult.length > 1 && (
							<FoodElement
								idFoods={this.state.ApiResult[1].idFoods}
								style={{ float: 'left' }}
								Name={this.state.ApiResult[1].Name}
								ImageLink={this.state.ApiResult[1].ImageLink}
								RCG={this.state.ApiResult[1].RCG}
								PrepTime={this.state.ApiResult[1].PrepTime}
								IsChecked={true}
							/>
						)}
						<div className="Spreader" />
						<div style={{ float: 'right' }}>
							<h1>You are at the right place !</h1>
							<p>&bull; M'I Meal provides delightful meals that are easy to make</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	componentDidMount = () => {
		Axios.get('/Meals/Trending/rcg/')
			.then(res => {
				this.setState({ ApiResult: res.data });
			})
			.catch();
	};
}

export default MainPage;

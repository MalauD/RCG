import React from 'react';
import Axios from 'axios';

import FoodElement from './FoodPage/FoodElement';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: [],
			ApiResult2: []
		};
	}

	render = () => {
		return (
			<div>
				<div className="BackgroundContainer">
					<div className="ColumnDiv Espacer">
						<h1 className="FoodLabel">Best meals by rcg rating</h1>
						<div className="Spreader" />
						{this.state.ApiResult.length > 0 && (
							<div className="RowDiv">
								{this.state.ApiResult.map(item => (
									<FoodElement
										key={item.idFoods}
										idFoods={item.idFoods}
										style={{ float: 'right' }}
										Name={item.Name}
										ImageLink={item.ImageLink}
										RCG={item.RCG}
										PrepTime={item.PrepTime}
										IsChecked={true}
									/>
								))}
							</div>
						)}
					</div>
					<div className="ColumnDiv Espacer">
						<h1 className="FoodLabel">Random selection</h1>
						<div className="Spreader" />
						{this.state.ApiResult2.length > 0 && (
							<div className="RowDiv">
								{this.state.ApiResult2.map(item => (
									<FoodElement
										key={item.idFoods}
										idFoods={item.idFoods}
										style={{ float: 'right' }}
										Name={item.Name}
										ImageLink={item.ImageLink}
										RCG={item.RCG}
										PrepTime={item.PrepTime}
										IsChecked={true}
									/>
								))}
							</div>
						)}
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
		Axios.get('/Meals/Trending/random/')
			.then(res => {
				this.setState({ ApiResult2: res.data });
			})
			.catch();
	};
}

export default MainPage;

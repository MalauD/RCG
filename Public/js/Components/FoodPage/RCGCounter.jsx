import React from 'react';
import axios from 'axios';

class RCGCounter extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="RCGCounter">
				<button onClick={this.handlePlusClick}>
					<span>+</span>
				</button>
				<div className="vl" />
				<p>{this.props.FoodInfo.RCG}</p>
				<div className="vl" />
				<button onClick={this.handleMinusClick}>
					<span>&#8722;</span>
				</button>
			</div>
		);
	}

	handlePlusClick = () => {
		axios
			.post('/foods/vote', {
				vote: {
					idFoods: this.props.idFoods,
					IsPositive: true
				}
			})
			.then(res => this.handleVoteResult(null, res))
			.catch(res => this.handleVoteResult(res));
	};

	handleMinusClick = () => {
		axios
			.post('/foods/vote', {
				vote: {
					idFoods: this.props.idFoods,
					IsPositive: false
				}
			})
			.then(res => this.handleVoteResult(null, res))
			.catch(res => this.handleVoteResult(res));
	};

	handleVoteResult = (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res);
	};
}

export default RCGCounter;

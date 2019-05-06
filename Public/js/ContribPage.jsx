import React from 'react';
import FoodContainer from './FoodContainer';
import { Link } from 'react-router-dom';

class ContribPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<div className="AccountContent">
					<p className="ContribTitle">Your Contributions</p>
					<FoodContainer />
					<Link to="/Create" style={{ left: '50%' }} className="LoginLink">
						It seems that you reach the end of your contributions. Click to create new ones
					</Link>
				</div>
			</div>
		);
	}
}

export default ContribPage;

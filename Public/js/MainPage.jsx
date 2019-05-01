import React from 'react';
import FoodContainer from './FoodContainer';
import TopNav from './TopNav';

class MainPage extends React.Component {
	constructor(props) {
		super(props);
		//Create a ref of the child Foodcontainer
		this.child = React.createRef();
	}

	render = () => {
		return (
			<div>
				<TopNav GotApiRep={this.TopNavApiRep} />

				<FoodContainer ref={this.child} />
			</div>
		);
	};

	TopNavApiRep = res => {
		//On an api response made in topnav, show result with the food container
		this.child.current.ShowResult(res);
	};
}

export default MainPage;

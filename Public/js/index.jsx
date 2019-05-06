import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import AccountPage from './AccountPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SearchPage from './SearchPage';
import FoodPage from './FoodPage';
import ContribPage from './ContribPage';
import CreatePage from './CreatePage';
import TopNav from './TopNav';
import AdminPage from './AdminPage';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO Implement some of thes route
		return (
			<Router>
				<div>
					<Route exact path="/" component={MainPage} />
					<Route path="/" component={TopNav} />
					<Route path="/Account" component={AccountPage} />
					<Route path="/Login" component={LoginPage} />
					<Route path="/Signup" component={RegisterPage} />
					<Route path="/Search" component={SearchPage} />
					<Route path="/Food/:idFoods" component={FoodPage} />
					<Route path="/Contrib" component={ContribPage} />
					<Route path="/Create" component={CreatePage} />
					<Route path="/Admin" component={AdminPage} />
				</div>
			</Router>
		);
	}
}

const element = <App />;

//Render the App Component on the Div of react.
ReactDOM.render(element, document.getElementById('ReactFoodContainer'));

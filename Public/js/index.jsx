import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './Components/MainPage';
import AccountPage from './Components/Account/AccountPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from './Components/Account/LoginPage';
import RegisterPage from './Components/Account/RegisterPage';
import SearchPage from './Components/Search/SearchPage';
import FoodPage from './Components/FoodPage/FoodPage';
import ContribPage from './Components/Creation/ContribPage';
import CreatePage from './Components/Creation/CreatePage';
import TopNav from './Components/Search/TopNav';
import AdminPage from './Components/Admin/AdminPage';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO Implement some of thes route
		return (
			<Router>
				<div className="Wrapper">
					<Route exact path="/" component={MainPage} />
					<Route path="/" component={TopNav} />
					<Route path="/Account" component={AccountPage} />
					<Route path="/Login" component={LoginPage} />
					<Route path="/Signup" component={RegisterPage} />
					<Route path="/Search" component={SearchPage} />
					<Route path="/Food/:idFoods/Food" component={FoodPage} />
					<Route path="/Contrib" component={ContribPage} />
					<Route path="/Create" component={CreatePage} />
					<Route path="/Admin" component={AdminPage} />
				</div>
				<div id="Footer">
					<p>&copy; 2019 - RCG Company</p>
					<p>Made with &hearts; by Malaury</p>
				</div>
			</Router>
		);
	}
}

const element = <App />;

//Render the App Component on the Div of react.
ReactDOM.render(element, document.getElementById('ReactFoodContainer'));

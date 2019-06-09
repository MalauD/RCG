import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './Components/MainPage';
import AccountPage from './Components/Account/AccountPage';
import { HashRouter, Route, Link } from 'react-router-dom';
import LoginPage from './Components/Account/LoginPage';
import RegisterPage from './Components/Account/RegisterPage';
import SearchPage from './Components/Search/SearchPage';
import FoodPage from './Components/FoodPage/FoodPage';
import ContribPage from './Components/Creation/ContribPage';
import CreatePage from './Components/Creation/CreatePage';
import TopNav from './Components/Search/TopNav';
import AdminPage from './Components/Admin/AdminPage';
import { Provider } from 'react-redux';
import store from './store';
import IngredientPage from './Components/FoodPage/IngredientPage';
import IngredientGroupPage from './Components/FoodPage/IngredientGroupPage';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// TODO Implement some of thes route
		return (
			<Provider store={store}>
				<HashRouter>
					<div className="Wrapper">
						<Route path="/" component={TopNav} />
						<Route exact path="/" component={MainPage} />
						<Route path="/Account" component={AccountPage} />
						<Route path="/Login" component={LoginPage} />
						<Route path="/Signup" component={RegisterPage} />
						<Route path="/Search" component={SearchPage} />
						<Route path="/Food/:idFoods/Food" component={FoodPage} />
						<Route path="/Contrib" component={ContribPage} />
						<Route path="/Create" component={CreatePage} />
						<Route path="/Admin" component={AdminPage} />
						<Route path="/Ingredient/Name/:id" component={IngredientPage} />
						<Route path="/Ingredient/Group/:name" component={IngredientGroupPage} />
						<Route path="/Ingredient/SubGroup/:name" component={IngredientGroupPage} />
					</div>
					<div id="Footer">
						<p>&copy; 2019 - RCG Company</p>
						<p>Made with &hearts; by Malaury</p>
					</div>
				</HashRouter>
			</Provider>
		);
	}
}

const element = <App />;

//Render the App Component on the Div of react.
ReactDOM.render(element, document.getElementById('ReactFoodContainer'));

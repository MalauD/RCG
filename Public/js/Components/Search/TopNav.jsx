import React from 'react';
import AccountLink from '/home/pi/RCGWebsite/Public/js/Components/Account/AccountLink';
import { withRouter, Link } from 'react-router-dom';
import LoginLink from '../Account/LoginLink';
import { connect } from 'react-redux';
import axios from 'axios';
import { SaveUser } from '../../Actions/Action';

const mapStateToProps = state => {
	return {
		IsLogged: state.AccountReducer.IsLogged
	};
};

function mapDispatchToProps(dispatch) {
	return {
		SaveUser: User => dispatch(SaveUser(User))
	};
}

class TopNavConnected extends React.Component {
	constructor(props) {
		super(props);
		//State for the current value on the search bar
		this.state = {
			inputSearch: '',
			APIResponse: ''
		};
	}

	render = () => {
		return (
			<div className="topnav">
				{/* <img src="/Logo.png" alt="logo" onClick={this.OnLogoClick} /> */}
				<div className="ConboRow">
					<img src="logoHugo.png" onClick={this.OnLogoClick} />
					<input
						type="text"
						id="search"
						className="FoodSearch"
						name="Search"
						placeholder="Search for food and way more !"
						autoComplete="off"
						value={this.state.inputSearch}
						onKeyPress={this.HandleKeyPressed}
						onChange={this.HandleSearchChange}
					/>
				</div>
				{this.props.IsLogged == true ? (
					<React.Fragment>
						<Link to="/Contrib">
							<p className="topnavLink " style={{ float: 'right' }}>
								Contributions
							</p>
						</Link>
						<AccountLink />
					</React.Fragment>
				) : (
					<LoginLink />
				)}
			</div>
		);
	};

	HandleSearchChange = e => {
		//Event fired when the search bar is modified
		//This line will reasign the inputSearch to the new value
		this.setState({ inputSearch: e.target.value });
	};

	HandleKeyPressed = e => {
		if (e.key == 'Enter') {
			//Check when the key enter is pressed and redirect the page with search fields
			this.props.history.push('/Search?q=' + this.state.inputSearch);
		}
	};

	OnLogoClick = () => {
		console.log('Clicked');
		this.props.history.push('/');
	};

	componentDidMount = () => {
		this.GetName();
	};

	GetName(callback) {
		//On launch request account detail and store in redux
		axios
			.get('/Account/User')
			.then(res => {
				this.props.SaveUser(res.data);
			})
			.catch(err => {});
	}
}

const TopNav = connect(
	mapStateToProps,
	mapDispatchToProps
)(TopNavConnected);

export default withRouter(TopNav);

import React from 'react';
import AccountLink from '/home/pi/RCGWebsite/Public/js/Components/Account/AccountLink';
import { withRouter, Link } from 'react-router-dom';
import LoginLink from '../Account/LoginLink';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		IsLogged: state.AccountReducer.IsLogged
	};
};

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
					<img src="RCG.png" onClick={this.OnLogoClick} />
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
				<Link to="/Contrib">
					<p className="topnavLink " style={{ float: 'right' }}>
						Contributions
					</p>
				</Link>
				{this.props.IsLogged ? <AccountLink /> : <LoginLink />}
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
}

const TopNav = connect(mapStateToProps)(TopNavConnected);

export default withRouter(TopNav);

import React from 'react';
import AccountLink from './AccountLink';
import { withRouter, Link } from 'react-router-dom';

class TopNav extends React.Component {
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
				<p className="TopnavTitle" onClick={this.OnLogoClick}>
					RCG
				</p>
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
				<Link to="/Contrib">
					<a className="topnavLink " style={{ float: 'right' }}>
						Contributions
					</a>
				</Link>
				<AccountLink />
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
		this.props.history.push('/');
	};
}

export default withRouter(TopNav);

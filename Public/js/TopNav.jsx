import React from 'react';
import AccountLink from './AccountLink';

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
				<img src="Logo.png" alt="logo" />

				<input
					type="text"
					id="search"
					className="FoodSearch"
					name="Search"
					placeholder="Search for food and way more !"
					value={this.state.inputSearch}
					onKeyPress={this.HandleKeyPressed}
					onChange={this.HandleSearchChange}
				/>
				<a href="/Contributions" style={{ float: 'right' }}>
					Contributions
				</a>
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
			//Check when the key enter is pressed and make a GET Call to
			//the Api
			fetch('/foods/name/' + this.state.inputSearch)
				.then(res => res.json())
				.then(
					result => {
						//Call the parent method GotApiRep
						this.props.GotApiRep(result);
					},
					err => {
						console.log(err);
					}
				);
		}
	};
}

export default TopNav;

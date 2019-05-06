import React from 'react';
import { Link } from 'react-router-dom';

class AccountLink extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			APIName: 'Account'
		};
	}

	render = () => {
		return (
			<div class="dropdown">
				<Link to="/Account">
					<button class="dropbtn">{this.state.APIName}</button>
				</Link>
				<div className="dropdown-content">
					<Link
						className="topnavLink"
						id="AccountLink"
						to="/Create"
						style={{ float: 'right', width: '100%' }}
					>
						Create
					</Link>
					<Link
						className="topnavLink"
						id="AccountLink"
						to="/Admin"
						style={{ float: 'right', width: '100% ' }}
					>
						Admin
					</Link>
					<Link
						className="topnavLink"
						id="AccountLink"
						onClick={this.Logout}
						style={{ float: 'right', width: '100% ' }}
					>
						Logout
					</Link>
				</div>
			</div>
		);
	};

	componentDidMount = () => {
		this.GetName();
	};

	Logout = () => {
		fetch('/Logout').then(() => {
			this.GetName();
		});
	};

	GetName() {
		fetch('/Account/User/Name')
			.then(res => res.json())
			.then(
				result => {
					this.setState({ APIName: result.Name });
				},
				error => {}
			);
	}
}

export default AccountLink;

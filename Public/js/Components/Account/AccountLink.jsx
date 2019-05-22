import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { LogoutUser, SaveUser } from '../../Actions/Action';

const mapStateToProps = state => {
	return { Name: state.AccountReducer.Name };
};

function mapDispatchToProps(dispatch) {
	return {
		LogoutUser: () => dispatch(LogoutUser()),
		SaveUser: User => dispatch(SaveUser(User))
	};
}

class AccountLinkConnected extends React.Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<div className="dropdown">
				<Link to="/Account">
					<button className="dropbtn">{this.props.Name ? this.props.Name : 'Account'}</button>
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
					<p
						className="topnavLink"
						id="AccountLink"
						onClick={this.Logout}
						style={{ float: 'right', width: '100% ' }}
					>
						Logout
					</p>
				</div>
			</div>
		);
	};

	componentDidMount = () => {
		this.GetName();
	};

	Logout = () => {
		fetch('/Logout').then(() => {
			this.props.LogoutUser();
		});
	};

	GetName(callback) {
		//On launch request account detail and store in redux
		axios.get('/Account/User').then(res => {
			this.props.SaveUser(res.data);
		});
	}
}

const AccountLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountLinkConnected);

export default AccountLink;

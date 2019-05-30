import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { LogoutUser } from '../../Actions/Action';

const mapStateToProps = state => {
	return { Name: state.AccountReducer.Name, Rank: state.AccountReducer.Rank };
};

function mapDispatchToProps(dispatch) {
	return {
		LogoutUser: () => dispatch(LogoutUser())
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
					<Link to="/Contrib">
						<p className="topnavLink " id="AccountLink" style={{ float: 'right', width: '100% ' }}>
							Contributions
						</p>
					</Link>
					{this.props.Rank > 100 && (
						<Link
							className="topnavLink"
							id="AccountLink"
							to="/Admin"
							style={{ float: 'right', width: '100% ' }}
						>
							Admin
						</Link>
					)}
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

	Logout = () => {
		fetch('/Logout').then(() => {
			this.props.LogoutUser();
		});
	};
}

const AccountLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountLinkConnected);

export default AccountLink;

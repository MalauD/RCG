import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		Name: state.AccountReducer.Name,
		Mail: state.AccountReducer.Mail,
		Rank: state.AccountReducer.Rank,
		IsLogged: state.AccountReducer.IsLogged
	};
};

class AccountPageConnected extends React.Component {
	constructor(props) {
		super(props);
	}
	render = () => {
		return (
			<div>
				<div className="AccountContent">
					<p id="AccountName">{this.props.Name}</p>
					<p id="AccountMail">{this.props.Mail}</p>
					<p id="AccountMail">Rank + {this.props.Rank}</p>
				</div>
			</div>
		);
	};

	componentDidMount = () => {
		this.RedirectIfNotLogged();
	};

	componentDidUpdate = () => {
		this.RedirectIfNotLogged();
	};

	RedirectIfNotLogged() {
		if (!this.props.IsLogged) this.props.history.push('/Login');
	}
}

const AccountPage = connect(mapStateToProps)(AccountPageConnected);

export default AccountPage;

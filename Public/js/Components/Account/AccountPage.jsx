import React from 'react';

class AccountPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			APIAcccountResult: { Name: 'AccountName', Mail: 'AccountMail', Rank: '' }
		};
	}
	render = () => {
		// TODO Support TopNav (see MainPage.jsx for an exemple)
		return (
			<div>
				<div className="AccountContent">
					<p id="AccountName">{this.state.APIAcccountResult.Name}</p>
					<p id="AccountMail">{this.state.APIAcccountResult.Mail}</p>
					<p id="AccountMail">Rank + {this.state.APIAcccountResult.Rank}</p>
				</div>
			</div>
		);
	};

	componentDidMount = () => {
		fetch('/Account/User/')
			.then(res => res.json())
			.then(
				APIAcccountResult => {
					this.setState({ APIAcccountResult });
				},
				err => {
					this.props.history.push('/Login');
				}
			);
	};
}

export default AccountPage;

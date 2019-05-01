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
			<Link id="AccountLink" to="/Account" style={{ float: 'right' }}>
				{this.state.APIName}
			</Link>
		);
	};

	componentDidMount = () => {
		fetch('/Account/User/Name')
			.then(res => res.json())
			.then(
				result => {
					this.setState({ APIName: result.Name });
				},
				error => {}
			);
	};
}

export default AccountLink;

import React from 'react';
import Axios from 'axios';

class UserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ApiResult: ''
		};
	}

	componentDidMount = () => {
		this.GetUser();
	};

	componentWillReceiveProps = () => {
		//url change (for params)
		this.GetUser();
	};

	GetUser() {
		Axios.get('/Account/Users/id/' + this.props.match.params.UserId)
			.then(res => {
				this.setState({ ApiResult: res.data });
			})
			.catch(() => this.setState({ ApiResult: '' }));
	}

	render() {
		return (
			<div>
				{this.state.ApiResult ? (
					<div className="AccountContent">
						<div className="RowContainer">
							<img
								src={
									this.state.ApiResult.ImageLink
										? this.state.ApiResult.ImageLink
										: '/FoodImage/DefaultAccount.png'
								}
								className="AccountImage"
							/>
							<div>
								<p id="AccountName">
									{this.state.ApiResult.name}
								</p>
								<p id="AccountMail">
									{this.state.ApiResult.mail}
								</p>
								<p id="AccountMail">
									Rank + {this.state.ApiResult.rank}
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="Spinner">
						<object type="image/svg+xml" data="spinner.svg">
							Your browser does not support SVG
						</object>
					</div>
				)}
			</div>
		);
	}
}

export default UserPage;

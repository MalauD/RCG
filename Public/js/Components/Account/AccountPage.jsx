import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { UpdateImage } from '../../Actions/Action';

const mapStateToProps = state => {
	return {
		Name: state.AccountReducer.Name,
		Mail: state.AccountReducer.Mail,
		Rank: state.AccountReducer.Rank,
		IsLogged: state.AccountReducer.IsLogged,
		ImageLink: state.AccountReducer.ImageLink
	};
};

function mapDispatchToProps(dispatch) {
	return {
		UpdateImage: ImageLink => dispatch(UpdateImage(ImageLink))
	};
}

class AccountPageConnected extends React.Component {
	constructor(props) {
		super(props);
		this.fileInput = React.createRef();
	}
	render = () => {
		return (
			<div>
				<div className="AccountContent">
					<div className="RowContainer">
						<div style={{ width: 'min-content' }}>
							<img
								src={
									this.props.ImageLink
										? this.props.ImageLink
										: '/FoodImage/DefaultAccount.png'
								}
								className="AccountImage"
							/>
							<div className="RowContainer">
								<input
									type="file"
									accept="image/*"
									ref={this.fileInput}
								/>
								<button
									className="UpdateImageButton"
									onClick={this.UpdateImage}
								>
									Update
								</button>
							</div>
						</div>
						<div>
							<p id="AccountName">{this.props.Name}</p>
							<p id="AccountMail">{this.props.Mail}</p>
							<p id="AccountMail">Rank + {this.props.Rank}</p>
						</div>
					</div>
				</div>
			</div>
		);
	};

	UpdateImage = () => {
		var data = new FormData();
		if (this.fileInput.current.files[0]) {
			data.append('ImageFile', this.fileInput.current.files[0]);
			Axios.post('Account/User/Update/', data)
				.then(res => {
					if (res.data.Updated) {
						console.log(res.data);
						this.props.UpdateImage(res.data.ImageLink);
					}
				})
				.catch(() => {});
		}
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

const AccountPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPageConnected);

export default AccountPage;

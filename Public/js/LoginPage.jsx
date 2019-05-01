import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		//Set state for the current value of all the fields
		// Also for the text in front of the label to create alerts
		// And finally for the css of each fields to color it up when there is an error
		this.state = {
			EmailField: '',
			PasswordField: '',
			LabelError: { Mail: 'Mail', Password: 'Password' },
			InputCSSError: { Mail: {}, Mail: {} }
		};
	}

	render = () => {
		return (
			<div className="LoginDiv">
				<p className="LoginTitle">Login on existing account</p>
				<label className="LoginLabel" id="Emaill">
					{this.state.LabelError.Mail}
				</label>
				<input
					style={this.state.InputCSSError.Mail}
					value={this.state.EmailField}
					onChange={this.OnEmailChanged}
					type="text"
					id="email"
					className="LoginFields"
					name="email"
					placeholder="Your E-Mail.."
				/>

				<label className="LoginLabel" id="Passwordl">
					{this.state.LabelError.Password}
				</label>
				<input
					style={this.state.InputCSSError.Password}
					value={this.state.PasswordField}
					onChange={this.OnPasswordChanged}
					type="text"
					id="lpassword"
					className="LoginFields"
					name="password"
					placeholder="Your secret password.."
				/>

				<input
					type="submit"
					value="Login"
					id="RegisterButton"
					className="LoginButton"
					onClick={this.OnSubmitLogin}
				/>
				<Link to="/Signup" className="LoginLink">
					Don't have an account ? Register here.
				</Link>
			</div>
		);
	};

	OnSubmitLogin = () => {
		//Make a post request using custom header to send it at JSON (see: https://stackoverflow.com/questions/29775797/fetch-post-json-data)
		fetch('/Login', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Mail: this.state.EmailField,
				Password: this.state.PasswordField
			})
		}).then(result => {
			//If there is no html error redirect to the homepage (user logged in)
			// Other wise display errors
			if (result.ok) this.props.history.push('/');
			else result.json().then(err => this.DisplayError(err));
		});
	};

	OnEmailChanged = e => {
		this.setState({ EmailField: e.target.value });
	};

	OnPasswordChanged = e => {
		this.setState({ PasswordField: e.target.value });
	};

	DisplayError = err => {
		//this function display error (see states def for more details)
		if (err.param == 'Mail') {
			this.setState({ LabelError: { Mail: 'Mail ' + err.err, Password: 'Password' } });
			this.setState({ InputCSSError: { Mail: { borderBottom: '2px solid red' }, Password: {} } });
		}
		if (err.param == 'Password') {
			this.setState({ LabelError: { Mail: 'Mail', Password: 'Password ' + err.err } });
			this.setState({ InputCSSError: { Mail: {}, Password: { borderBottom: '2px solid red' } } });
		}
	};
}
export default LoginPage;

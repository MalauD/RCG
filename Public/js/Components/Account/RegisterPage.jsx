import React from 'react';
import { Link } from 'react-router-dom';

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		//Set state for the current value of all the fields
		// Also for the text in front of the label to create alerts
		// And finally for the css of each fields to color it up when there is an error
		this.state = {
			EmailField: '',
			PasswordField: '',
			NameField: '',
			LabelError: { Name: 'Name', Mail: 'Mail', Password: 'Password' },
			InputCSSError: { Name: {}, Mail: {}, Mail: {} }
		};
	}
	render() {
		return (
			<div className="LoginDiv">
				<p className="LoginTitle">Create an account</p>
				<label className="LoginLabel" id="Namel">
					{this.state.LabelError.Name}
				</label>
				<input
					style={this.state.InputCSSError.Name}
					value={this.state.NameField}
					onChange={this.OnNameChanged}
					type="text"
					id="fname"
					className="LoginFields"
					name="firstname"
					placeholder="Your Name.."
				/>
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
					type="password"
					id="lpassword"
					className="LoginFields"
					name="password"
					placeholder="Your secret password.."
				/>

				<input
					type="submit"
					value="Register"
					id="RegisterButton"
					className="LoginButton"
					onClick={this.OnSubmitRegister}
				/>
				<Link to="/Login" className="LoginLink">
					Already have an account ? Login here
				</Link>
			</div>
		);
	}

	OnSubmitRegister = () => {
		//Make a post request using custom header to send it at JSON (see: https://stackoverflow.com/questions/29775797/fetch-post-json-data)
		fetch('/Signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				Name: this.state.NameField,
				Mail: this.state.EmailField,
				Password: this.state.PasswordField
			})
		}).then(result => {
			//If there is no html error redirect to the homepage (user logged in)
			// Other wise display errors
			//Use result.json().then because of the promise context : (see: https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise)
			if (result.ok) this.props.history.push('/');
			else result.json().then(err => this.DisplayError(err));
		});
	};

	OnNameChanged = e => {
		this.setState({ NameField: e.target.value });
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
			this.setState({ LabelError: { Mail: 'Mail ' + err.err, Password: 'Password', Name: 'Name' } });
			this.setState({ InputCSSError: { Name: {}, Mail: { borderBottom: '2px solid red' }, Password: {} } });
		}
		if (err.param == 'Password') {
			this.setState({ LabelError: { Mail: 'Mail', Password: 'Password ' + err.err, Name: 'Name' } });
			this.setState({ InputCSSError: { Name: {}, Mail: {}, Password: { borderBottom: '2px solid red' } } });
		}
		if (err.param == 'Name') {
			this.setState({ LabelError: { Mail: 'Mail ', Password: 'Password', Name: 'Name ' + err.err } });
			this.setState({ InputCSSError: { Name: { borderBottom: '2px solid red' }, Mail: {}, Password: {} } });
		}
	};
}

export default RegisterPage;

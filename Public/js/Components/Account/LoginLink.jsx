import React from 'react';
import { Link } from 'react-router-dom';

class LoginLink extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="LoginLinksContainer">
				<Link to="/Login">
					<button className="LoginButtonTopNav">Login</button>
				</Link>
				<Link to="/Signup">
					<button className="RegisterButtonTopNav">Register</button>
				</Link>
			</div>
		);
	}
}

export default LoginLink;

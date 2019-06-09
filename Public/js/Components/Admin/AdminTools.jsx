import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AdminTools extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			MoveStyle: {},
			DeleteStyle: { color: 'red' }
		};
	}
	render() {
		return (
			<div className="AdminTools">
				<button style={this.state.MoveStyle} onClick={this.OnMoveClick}>
					{this.props.IsChecked == 'false'
						? 'Accept this contribution'
						: 'Move this conttribution to pending'}
				</button>
				{this.props.IsChecked == 'false' && (
					<button style={this.state.DeleteStyle} onClick={this.OnDeleteClick}>
						Delete this contribution
					</button>
				)}
			</div>
		);
	}

	OnMoveClick = () => {
		axios
			.post('/foods/admin/move/' + this.props.idFoods + '?Checked=' + this.props.IsChecked)
			.then(res => {
				// ! In test
				console.log(this.props.IsChecked);
				console.log(this.props.IsChecked == 'true');
				let url;
				if (this.props.IsChecked == 'true') url = '/Food/' + res.data.NewID + '/Food?Checked=false';
				else url = '/Food/' + res.data.NewID + '/Food?Checked=true';
				console.log(url);
				this.props.history.push(url);
				//TODO add notif
			})
			.catch(res => {
				this.setState({ MoveStyle: { borderColor: 'red' } });
			});
	};

	OnDeleteClick = () => {
		axios
			.post('/foods/admin/delete/' + this.props.idFoods)
			.then(res => {
				//Todo add notif
				this.props.history.push('/');
			})
			.catch(res => {
				this.setState({ DeleteStyle: { borderColor: 'red' } });
			});
	};
}

export default withRouter(AdminTools);

import React from 'react';
import queryString from 'query-string';
import TopNav from './TopNav';
import FoodContainer from './FoodContainer';

class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.child = React.createRef();
	}
	render() {
		return (
			<div>
				<FoodContainer ref={this.child} />
			</div>
		);
	}

	componentDidMount = () => {
		//This is called on first render of page
		this.APISearch();
	};

	componentDidUpdate = () => {
		//This is called when the "url update"
		this.APISearch();
	};

	APISearch = () => {
		//Get qury params and make an api search
		const values = queryString.parse(this.props.location.search);
		fetch('/foods/name/' + values.q)
			.then(res => res.json())
			.then(
				result => {
					//Call the food container method to show API result
					this.child.current.ShowResult(result);
				},
				err => {
					console.log(err);
				}
			);
	};
}

export default SearchPage;

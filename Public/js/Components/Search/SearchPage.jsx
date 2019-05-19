import React from 'react';
import queryString from 'query-string';
import FoodContainer from '/home/pi/RCGWebsite/Public/js/Components/FoodPage/FoodContainer';

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
		this.child.current.MakeSearch(values.q);
	};
}

export default SearchPage;

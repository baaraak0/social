import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Storage from '../services/Storage';
import {browserHistory} from 'react-router';

import * as globalActions from '../redux/actions/globalActions.js';
import * as userActions from '../redux/actions/userActions.js';


function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({...globalActions, ...userActions}, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		global: state.global,
		user: state.user
	};
}


class Logout extends React.Component {

	componentWillMount() {
		this.props.actions.logOut();
		Storage.deleteLocalStorage('jwt')
		browserHistory.push('/login')
	}

	render() {
		return (
			<div className="spinner">

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
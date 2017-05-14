import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Storage from '../services/Storage';

import * as globalActions from '../redux/actions/globalActions.js';
import * as userActions from '../redux/actions/userActions.js';

import Header from '../modules/common/header/Header';

import '../styles/app.less';
import '../styles/global.less';
import '../styles/index.less';

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


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}
	
	componentWillReceiveProps(newProps) {
		if(newProps.user.userCoords.latitude !== null && newProps.user.userCoords.longitude !== null) {
			const coords = {
				latitude: newProps.user.userCoords.latitude,
				longitude: newProps.user.userCoords.longitude
			}
			// this.props.actions.setUserLocation(coords);
		}
	}

	componentWillMount() {
		if(Storage.getLocalStorage('jwt') !== null) {
			this.props.actions.getUserByTokenAction();
		} else {
			this.props.actions.renderApp();
		}
	}

	onLogout = () => {
		this.props.actions.logOut();
		Storage.deleteLocalStorage('jwt')
	}

	render() {
		const _this = this;
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				actions: _this.props.actions,
				global: _this.props.global,
				user: _this.props.user,
			})
		);
		if(this.props.global.isAppReady) {
			return (
				<div>
					<Header user={this.props.user} location={this.props.location.pathname} onLogout={this.onLogout} />
					<div className="content">
						{childrenWithProps}
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="spinner" />	
						<img src="media/gifs/light_blue_material_design_loading.gif" alt="loader"	/>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
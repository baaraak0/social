import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "../../public/css/custom_style.css";
import Storage from '../services/Storage';

import * as globalActions from '../redux/actions/globalActions.js';
import * as userActions from '../redux/actions/userActions.js';

import Header from '../components/App/Header';
import Footer from '../components/App/Footer';

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
			this.props.actions.setUserLocation(coords);
		}
	}

	componentWillMount() {
		if(Storage.getLocalStorage('jwt') !== null) {
			this.props.actions.getUserByTokenAction();
		} else {
			this.props.actions.renderApp();
		}
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
					<Header user={this.props.user}/>
					<div className="content">
						{childrenWithProps}
					</div>
					<Footer />
				</div>
			);
		} else {
			return (
				<div className="spinner">
					<img
						src="https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif"
						alt="spinner"/>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React from 'react';
import {Link} from 'react-router';
import {validationForm} from '../../services/Utills';
import {browserHistory} from 'react-router';
import Storage from '../../services/Storage'

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			username: '',
			errorText: ''
		};
		this.errorText = '';
	}

	componentWillMount() {
		if(Storage.getLocalStorage('jwt') !== null) {
			browserHistory.push('/');
		}
	}

	componentWillReceiveProps(newProps) {
		if(newProps.user.token !== null || newProps.user.isConnected) {
			Storage.setLocalStorage('jwt', newProps.user.token);
			browserHistory.push('/');
		}
		if(newProps.user.registrationError !== this.props.user.registrationError) {
			if(newProps.user.registrationError.email) {
				this.setState({ errorText: 'Email ' + newProps.user.registrationError.email })
			} else if(newProps.user.registrationError.password) {
				this.setState({ errorText: 'Password ' +newProps.user.registrationError.password })
			} else if (newProps.user.registrationError.username) {
				this.setState({ errorText: 'User name ' + newProps.user.registrationError.username })
			}
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit = () => {
		if (this.state.password !== '') {
			if(this.state.username !== '') {
			const user = {username: this.state.username, email: this.state.email, password: this.state.password};
			const userValidation = validationForm(user)
			if (Object.keys(userValidation).length > 0) {
				this.setState({errorText: 'Email not valid'});
			} else {
				this.setState({errorText: ''});
				this.props.actions.registrationAccount(user);
			}
			} else {
				this.setState({errorText: 'User name can not be empty!'})
			}
		} else {
			this.setState({errorText: 'Passwords can not be empty!'})
		}
	}


	render() {
		return (
			<div className="container-fluid bg-image">
				<div className="row">
					<div className="login-wraper">						
						<div className="login-window">
							<h1 className="l-head">
								Sign Up
							</h1>
							<div className="l-form">
								<div className="formError">{this.state.errorText}</div>
								<form>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">User name</label>
										<input type="text" name="username" className="form-control"
											   id="exampleInputEmail1"
											   onChange={this.handleChange} placeholder="Username"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Email</label>
										<input type="text" name="email" className="form-control" id="exampleInputEmail1"
											   onChange={this.handleChange} placeholder="sample@gmail.com"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputPassword1">Password</label>
										<input type="password" name="password" className="form-control"
											   id="exampleInputPassword1" onChange={this.handleChange}
											   placeholder="**********"/>
									</div>
									<div className="row">
										<div className="">
											<button type="button" onClick={this.onSubmit} className="btn">Sign
												Up
											</button>
										</div>
										<div className="">
											<button type="button" className="btn">
												<Link to={'/login'}>Log In</Link>
											</button>
										</div>										
									</div>
									<div className="row">
										<div className="forgottext">
											<a href="#">By clicking "Sign Up" I agree to circle's Terms of Service.</a>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
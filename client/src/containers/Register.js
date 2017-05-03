import React from 'react';
import {Link} from 'react-router';
import {validationForm} from '../services/Utills';
import {browserHistory} from 'react-router';
import Storage from '../services/Storage'

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
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit() {
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
						<img src="images/login.jpg" alt=""/>
						<div className="banner-text">
							<div className="line"></div>
							<div className="b-text">
								Watch <span className="color-active">millions<br /> of</span> <span
								className="color-b1">v</span><span className="color-b2">i</span><span
								className="color-b3">de</span><span className="color-active">os</span> for free.
							</div>
							<div className="overtext">
								Over 6000 videos uploaded Daily.
							</div>
						</div>
						<div className="login-window">
							<div className="l-head">
								Sign Up for Free
							</div>
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
										<div className="col-lg-7">
											<button type="button" onClick={this.onSubmit} className="btn btn-cv1">Sign
												Up
											</button>
										</div>
										<div className="col-lg-1 ortext">or</div>
										<div className="col-lg-4 signuptext"><Link to={'/login'}>Log In</Link></div>
									</div>
									<div className="row">
										<div className="col-lg-12 forgottext">
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
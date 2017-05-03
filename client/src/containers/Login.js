import React from 'react';
import {validationForm} from '../services/Utills';
import { Link, browserHistory } from 'react-router';
import Storage from '../services/Storage';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errorText: ''
        };
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
		if(newProps.user.loggingAttempt !== this.props.user.loggingAttempt) {
			this.setState({ errorText : 'Email or password not found in DB' });
		}
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit() {
        const user = {email: this.state.email, password: this.state.password};
        const userValidation = validationForm(user)
        if (Object.keys(userValidation).length > 0) {
            this.setState({ errorText : 'Email or password in invalid!' });
        } else {
            this.setState({ errorText : '' });
            this.props.actions.verifiedUser(user);
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
                                Log Into Your Circle Account
                            </div>
                            <div className="formError">{this.state.errorText}</div>
                            <div className="l-form">
                                <form action="login.html">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input type="text" className="form-control" name="email"
                                               id="exampleInputEmail1" placeholder="sample@gmail.com"
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" name="password"
                                               id="exampleInputPassword1" placeholder="**********"
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <button type="button" onClick={this.onSubmit} className="btn btn-cv1">
                                                Login
                                            </button>
                                        </div>
                                        <div className="col-lg-1 ortext">or</div>
                                        <div className="col-lg-4 signuptext"><Link to='/register'>Sign Up</Link></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 forgottext">
                                            <a href="#">Forgot Username or Password?</a>
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

export default Login; 
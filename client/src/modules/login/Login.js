import React from 'react';
import {validationForm} from '../../services/Utills';
import { Link, browserHistory } from 'react-router';
import Storage from '../../services/Storage';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errorText: ''
        };
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

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = () => {
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
                        <div className="login-window">
                            <h1 className="l-head">
                                Log Into Your Account
                            </h1>
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
                                        <div className="">
                                            <button type="button" onClick={this.onSubmit} className="btn">
                                                Login
                                            </button>
                                        </div>
                                        <div className="">
                                            <button type="button" className="btn">
                                               <Link to='/register'>Sign Up</Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="forgottext">
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
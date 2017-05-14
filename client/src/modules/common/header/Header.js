import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {

	render() {


		return (
			<div className="header">
				<Link to={'/'} className="logo">
					<img src="media/logo.svg" alt="" />
				</Link>
					{
						(this.props.user.isConnected)
							? this.renderLogedInHeader()
							: this.renderLogedOutHeader()
					}
			</div>
		);
	}

	renderLogedInHeader() {
		return (
			<div>
				<div className="avatar">
					<img src="media/images/avatar.png" alt="avatar"/>
				</div>
				<div className="">
					<Link to={'/upload'}>Upload post</Link>
					<Link to={'/'} onClick={this.props.onLogout}>Logout</Link>				
				</div>
			</div>
		);
	}

	renderLogedOutHeader() {
		const location = this.props.location;
		return (
			<div className="">
				{
					location === "/login" ? null :
						<h2><Link to={'/login'}>Login</Link></h2>
				}
				{
					location === "/register" ? null :
						<h2><Link to={'/register'}>Sign up</Link></h2>
				}						
			</div>
		);
	}


}

export default Header;
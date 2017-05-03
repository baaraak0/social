import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {

	render() {


		return (
			<div className="container-fluid">
				<div className="row">
					<div className="navbar-container">
						<div className="container">
							<div className="row">
								<div className="col-sm-5">
									<Link to={'/'} className="navbar-brand">
										<img src="images/logo.svg" alt="Project name" className="logo"/>
									</Link>
								</div>
								<div className="col-sm-7">
									{
										(this.props.user.isConnected)
											? this.renderLoginHeader()
											: this.renderLogoutHeader()

									}
									<div className="clearfix"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		);
	}

	renderLoginHeader() {
		return (
			<div>
				<div className="avatar pull-left">
					<img src="images/avatar.png" alt="avatar"/>
					<span className="status"></span>
				</div>
				<div className="selectuser pull-left">
					<div className="btn-group pull-right">
						<Link to={'/profile'}>My profile</Link>
						<Link to={'/upload'}>Upload post</Link>
						<Link to={'/logout'}>Logout</Link>
					</div>
				</div>
			</div>
		);
	}

	renderLogoutHeader() {
		return (
			<div className="selectuser pull-left">
				<div className="btn-group pull-right dropdown">
					<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
							data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						Login / Register
						<span className="caret"></span>
					</button>
					<ul className="dropdown-menu">
						<li><Link to={'/login'}>Login</Link></li>
						<li><Link to={'/register'}>Sign up</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Header;
import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row">
                        <div className="container padding-def">
                            <div className="col-lg-1  col-sm-2 col-xs-12 footer-logo">
                                <a className="navbar-brand" href="index.html"><img src="images/logo.svg" alt="Project name" className="logo" /></a>
                            </div>
                            <div className="col-lg-7  col-sm-7 col-xs-12">
                                <div className="f-links">
                                    <ul className="list-inline">
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Press</a></li>
                                        <li><a href="#">Copyright</a></li>
                                        <li><a href="#">Advertise</a></li>
                                        <li><a href="#">Help</a></li>
                                    </ul>
                                </div>
                                <div className="delimiter"></div>
                                <div className="f-copy">
                                    <ul className="list-inline">
                                        <li><a href="#">Terms</a></li>
                                        <li><a href="#">Privacy</a></li>
                                        <li>Copyrights 2016 </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-offset-1 col-lg-3 col-sm-3 col-xs-12">
                                <div className="f-icon pull-left">
                                    <a href="#"><i className="fa fa-facebook-square"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-google-plus"></i></a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
import React from 'react';
import {browserHistory} from 'react-router';
import Storage from '../../../services/Storage'

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			body: '',
			errorText: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		if(Storage.getLocalStorage('jwt') === null) {
			browserHistory.push('/');
		}
	}

	componentWillReceiveProps(newProps) {
		if(Object.keys(newProps.user.viewPostData).length > 0) {
			browserHistory.push('/view/' + newProps.user.viewPostData.slug);
		}
	}

	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit() {
		if (this.state.title !== '') {
			if(this.state.description !== '') {
				if(this.state.body !== '') {
					this.setState({errorText: ''});
					const post = {
						title: this.state.title,
						description: this.state.description,
						body: this.state.body,
						tagList: []
					};
					this.props.actions.createPost(post);
				} else {
					this.setState({errorText: 'Body can not be empty!'})
				}
			} else {
				this.setState({errorText: 'Description can not be empty!'})
			}
		} else {
			this.setState({errorText: 'Title can not be empty!'})
		}
	}


	render() {
		return (
			<div className="container uploadPage">
				<div className="row">
						<div className="login-window">
							<div className="l-head">
								<h2>Create new post</h2>
							</div>
							<div className="l-form">
								<div className="formError">{this.state.errorText}</div>
								<form>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Title</label>
										<input type="text" name="title" className="form-control"
											   id="exampleInputEmail1"
											   onChange={this.handleChange} placeholder="Post title"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Description</label>
										<input type="text" name="description" className="form-control" id="exampleInputEmail1"
											   onChange={this.handleChange} placeholder="Post description"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputPassword1">Body</label>
										<textarea name="body" className="form-control"
											   id="exampleInputPassword1" onChange={this.handleChange}
											   placeholder="Post body"/>

									</div>
									<div className="row">
										<div className="col-lg-12">
											<button type="button" onClick={this.onSubmit} className="btn btn-cv1">
												Create post
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

		);
	}
}

export default Register;
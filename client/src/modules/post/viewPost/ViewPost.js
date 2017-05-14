import React from 'react';

class ViewPost extends React.Component {
	
	componentWillMount() {
		const query = this.props.location.pathname.replace('/view/', '');
		this.props.actions.getPostBySlug(query);
	}
	render() {
		return (
			<div className="postViewPage">
				<h1>{this.props.user.viewPostData.title}</h1>
				<h3>{this.props.user.viewPostData.description}</h3>
				<h6>{this.props.user.viewPostData.body}</h6>
			</div>
		);
	}
}

export default ViewPost;
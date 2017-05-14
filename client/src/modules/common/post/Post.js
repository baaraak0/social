import React from 'react';
import {Link, browserHistory} from 'react-router';

class Post extends React.Component {

	render() {
		const { post, index } = this.props;
		return (	
				<div className="post">	
				<hr/>						
					<h3 className="postTitle" ><Link to={'/view/' + post.slug} >{post.title}</Link></h3>
					<span className="postDate">{post.createdAt}</span>
					<p>{post.description}</p>							
					<strong><Link to={'/view/' + post.slug} >Read More</Link></strong>
					<ul className="postTags">
						<li><span className="tag">tag1</span></li>
					</ul>
				</div>
		)	
	}
}

export default Post;
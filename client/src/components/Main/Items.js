import React from 'react';
import {Link, browserHistory} from 'react-router';

class Items extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	directModal(item) {
		browserHistory.push('/view/' + item.slug);
	}

	render() {
		const test = this.props.global.itemsData.map((item, index) => {
			return (
				<div className="gridItem" key={index}>
					<div className="gridItemWrapper">
						<div className="gritItemTitle" onClick={() => this.directModal(item)}>
                            <span href="">
                                <h3 className="pinItemTitleText">{item.title}</h3>
                            </span>
						</div>
						<div className="gridItemText">
							<p>{item.description}</p>
							<Link onClick={() => this.directModal(item)}>Read More</Link>
						</div>
					</div>
					<div className="gridItemFooter">
						<div className="gridItemCategory">
							<a href="">TAGS</a>
						</div>
						<div className="gridItemViews">
							<i className="fa fa-eye" aria-hidden="true"></i>
							<p>{item.views}</p>
						</div>
						<div className="gridItemComments">
							<i className="fa fa-commenting-o" aria-hidden="true"></i>
							<p>{item.comments}</p>
						</div>
						<div className="gridItemLikes">
							<i className="fa fa-heart-o" aria-hidden="true"></i>
							<p>{item.likes}</p>
						</div>
					</div>
				</div>
			)
		})

		return (
			<div className="gridWrapper">
				{test}

			</div>
		);
	}
}

export default Items;
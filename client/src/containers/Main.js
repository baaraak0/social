import React from 'react';
import Items from '../components/Main/Items';

class Main extends React.Component {

	componentWillMount() {
		this.props.actions.getAllPosts();
	}

    render() {
        return (
            <div className="itemsContainer">
                <Items
					global={this.props.global}
					actions={this.props.actions}
                />
            </div>
        );
    } 
}

export default Main;
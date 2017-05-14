import React from 'react';
import Post from '../common/post/Post';
import GoogleMapComponent from '../geoLocation/components/GoogleMap';
import {geolocated} from 'react-geolocated';

class Main extends React.Component {

	componentWillMount() {
		this.props.actions.getAllPosts();
	}

	shouldComponentUpdate(newProps, newState) {
		if(this.props.coords !== newProps.coords) {
			this.setCoords(newProps.coords);
		}
		return true;
	}

	setCoords(coords) {
		this.props.actions.setCoordsToStore(coords)
	}

    render() {
        return (
            <div className="itemsContainer">
				{
					(this.props.user.userCoords.latitude !== null && this.props.user.userCoords.longitude !== null) ?
						<GoogleMapComponent
							coords={this.props.user.userCoords}
						/>
						:
						<div className="container text-center">
							<h1>Please enable Location on your device</h1>
						</div>

				}
				{
					this.props.global.itemsData.map((post, index) => 
						<Post
							key={index}
							post={post}	
							index={index}						
						/>						
					)
				}
            </div>
        );
    }
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true,
	},
	userDecisionTimeout: 5000
})(Main);
import React from 'react';

export default class GoogleMapComponent extends React.Component {

	setGoogleMap() {

	}

	render() {
		return (
			<div>
				<h2>Latitude: {this.props.coords.latitude}</h2>
				<h2>Longitude: {this.props.coords.longitude}</h2>
			</div>
		)
	}
}

import React from 'react';
import turf from "turf";
import GoogleMap from 'google-map-react';
import PinLocation from './PinLocation';

export default class GoogleMapComponent extends React.Component {

	getDistance(from, to){
		const units = "kilometers";
		const distance = turf.distance(from, to, units);

		return distance;
	}

	getAbsoluteCenterLocation(pointsArr){

		const points = {
			"type": "FeatureCollection",
  			"features": pointsArr
		};

		const centerPt = turf.center(points);

		return centerPt.geometry.coordinates;
	}

	render() {
		const {latitude, longitude} = this.props.coords;
		const userLocation = {
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "Point",
				"coordinates": [latitude, longitude]
			}
		}
		const TelAvivCenter = {
			"type": "Feature",
			"properties": {},
			"geometry": {
				"type": "Point",
				"coordinates": [32.069467, 34.770374] // TelAvivCenter
			}
		}

		const centerPoint = this.getAbsoluteCenterLocation([userLocation,TelAvivCenter]);			

		const googleApiKey = 'AIzaSyCCL-KOmx_Vo01NhE27chGsU1efCw7fO0I';
		const center = [centerPoint[0], centerPoint[1]];
		const zoom = 10;
		
		return (
			<div> 
				<h4>Latitude: {latitude}</h4>
				<h4>Longitude: {longitude}</h4>
				<h4>Distance from Tel-Aviv: {this.getDistance(userLocation, TelAvivCenter)} km</h4>
				<div className="googleMap">
					<GoogleMap 
						bootstrapURLKeys={{key:googleApiKey}} // https://console.developers.google.com/apis/
						center={center}
						zoom={zoom}>
						<PinLocation lat={latitude} lng={longitude} />
						<PinLocation lat={32.069467} lng={34.770374} />
					</GoogleMap>
				</div>
			</div>
		)
	}
}

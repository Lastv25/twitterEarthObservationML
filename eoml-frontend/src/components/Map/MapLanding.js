import React from 'react';
import { Map, TileLayer} from "react-leaflet";
import "../../assets/css/map.css"


export default function MapLanding (props) {
    return (
        <Map center={[0, 0]} zoom={3}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
  );
};
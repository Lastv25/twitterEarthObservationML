import React from 'react';
import { TileLayer ,MapContainer } from "react-leaflet";
import "../../assets/css/map.css"

export default function MapComponent (props) {
    return (
        <MapContainer center={[0, 0]} zoom={3}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
  );
};
import React from 'react';
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw"
import "../../assets/css/map.css"


export default function MapComponent ({form}) {

    return (
        <Map center={[0, 0]} zoom={3}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <FeatureGroup >
            <EditControl
              position='topright'
              draw={{
                polyline: false,
                marker: false,
                circle: false,
                circlemarker: false
              }}
              onCreated={e => {
                        form.aoi = e.layer.toGeoJSON().geometry;
                }}
              onEdited={e => {
                    e.layers.eachLayer(function(layer){
                        form.aoi = e.layer.toGeoJSON().geometry;
                    }
                    );
                }}
              />
            </FeatureGroup>
        </Map>
  );
};
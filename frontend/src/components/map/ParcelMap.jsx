
import React from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function ParcelMap({ onChange }) {
  
  const handleCreated = (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();

    console.log("[ParcelMap] onCreated -> toGeoJSON:", geojson);

    if (onChange) {
      onChange(geojson); 
    }
  };


  const handleEdited = (e) => {
    let lastGeoJSON = null;

    e.layers.eachLayer((layer) => {
      lastGeoJSON = layer.toGeoJSON();
    });

    console.log("[ParcelMap] onEdited -> toGeoJSON:", lastGeoJSON);

    if (onChange) {
      onChange(lastGeoJSON);
    }
  };

  
  const handleDeleted = () => {
    console.log("[ParcelMap] onDeleted -> sin polígono");
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div
      className="bb-parcel-map"
      style={{
        height: "260px", 
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[40.4168, -3.7038]} 
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              polygon: true,
              rectangle: true,
              polyline: false,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            edit={{ edit: true, remove: true }}
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default ParcelMap;
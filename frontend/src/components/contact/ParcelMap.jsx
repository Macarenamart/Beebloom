
import React, { useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function ParcelMap({ onChange }) {
  const featureGroupRef = useRef(null);

  
  const emitGeoJSON = () => {
    const fg = featureGroupRef.current;
    if (!fg) {
      console.log("[ParcelMap] featureGroupRef vacío");
      return;
    }

    
    const leafletFG = fg; 
    if (leafletFG.toGeoJSON) {
      const geojson = leafletFG.toGeoJSON();
      console.log("[ParcelMap] emitGeoJSON ->", geojson);
      if (onChange) {
        onChange(geojson);
      }
    } else {
      console.log("[ParcelMap] El FeatureGroup no tiene toGeoJSON:", leafletFG);
    }
  };

  const handleCreated = (e) => {
    console.log("[ParcelMap] onCreated:", e);
    emitGeoJSON();
  };

  const handleEdited = (e) => {
    console.log("[ParcelMap] onEdited:", e);
    emitGeoJSON();
  };

  const handleDeleted = (e) => {
    console.log("[ParcelMap] onDeleted:", e);
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

        <FeatureGroup ref={featureGroupRef}>
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
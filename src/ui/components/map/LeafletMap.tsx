import { LatLngTuple } from "leaflet";
import React, { FC, useEffect, useRef } from "react";
import * as L from "leaflet";

import "leaflet/dist/leaflet.css";
import { MapModel } from "../../../models/MapModel";
import { MapEntity_Leaflet } from "../../../modules/leaflet";

const LeafletMap: FC<{
  model: MapModel;
  height?: string;
}> = ({ model, height }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const

    const map = L.map(mapRef.current as HTMLDivElement);
    console.log(map);

    const leafletMap = MapEntity_Leaflet.fromMapModel(model, map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );

    // map.setView(position, 13);

    // L.marker(position)
    //   .addTo(map)
    //   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    //   .openPopup();

    return () => {
      console.log("Cleaning up");
      leafletMap.unmount();
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: height || "400px",
          border: "1px solid black", }}
      >
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div> 
    </div>
  );
};

export default LeafletMap;

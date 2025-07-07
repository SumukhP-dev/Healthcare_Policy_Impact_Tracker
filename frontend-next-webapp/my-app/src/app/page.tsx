"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios, { AxiosResponse } from "axios";

const geoUrl =
  "https://raw.githubusercontent.com/SumukhP-dev/Healthcare_Policy_Impact_Tracker/refs/heads/main/frontend-next-webapp/my-app/public/california-json-map2.geojson";

let content: AxiosResponse<any, any>;

axios
  .get(geoUrl)
  .then((response) => {
    console.log("Axios is working:", response.data);
    content = response.data;
  })
  .catch((error) => {
    console.error("Error using Axios:", error);
  });

export default function MapChart() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ComposableMap
        width={2000}
        height={900}
        projectionConfig={{
          scale: 5250,
          center: [-119.4179, 36.7783], // Centering on California
        }}
      >
        <Geographies geography={content}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

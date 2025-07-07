"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios, { AxiosResponse } from "axios";

const geoUrl =
  "https://raw.githubusercontent.com/SumukhP-dev/Healthcare_Policy_Impact_Tracker/refs/heads/main/frontend-next-webapp/my-app/public/california-json-map.geojson";

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
    <ComposableMap>
      <Geographies geography={content}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}

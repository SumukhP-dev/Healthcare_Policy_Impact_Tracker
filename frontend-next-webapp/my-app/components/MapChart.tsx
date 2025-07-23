"use client";

import axios, { AxiosResponse } from "axios";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import React, { memo, use, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import ReactTooltip from "react-tooltip";
import { Tooltip } from "react-bootstrap";
import { scaleLinear } from "d3-scale";
import path from "path";
import { useSelector, useDispatch } from "react-redux";
import { countySlice } from "../src/app/store/features/countySlice";
import { percentSlice } from "../src/app/store/features/percentSlice";
import { setCounty } from "../src/app/store/features/countySlice";
import { setPercent } from "../src/app/store/features/percentSlice";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const californiaCounties: Array<string> = [
  "Alameda",
  "Alpine",
  "Amador",
  "Butte",
  "Calaveras",
  "Colusa",
  "Contra Costa",
  "Del Norte",
  "El Dorado",
  "Fresno",
  "Glenn",
  "Humboldt",
  "Imperial",
  "Inyo",
  "Kern",
  "Kings",
  "Lake",
  "Lassen",
  "Los Angeles",
  "Madera",
  "Marin",
  "Mariposa",
  "Mendocino",
  "Merced",
  "Modoc",
  "Mono",
  "Monterey",
  "Napa",
  "Nevada",
  "Orange",
  "Placer",
  "Plumas",
  "Riverside",
  "Sacramento",
  "San Benito",
  "San Bernardino",
  "San Diego",
  "San Francisco",
  "San Joaquin",
  "San Luis",
  "Obispo",
  "San Mateo",
  "Santa Barbara",
  "Santa Clara",
  "Santa Cruz",
  "Shasta",
  "Sierra",
  "Siskiyou",
  "Solano",
  "Sonoma",
  "Stanislaus",
  "Sutter",
  "Tehama",
  "Trinity",
  "Tulare",
  "Tuolumne",
  "Ventura",
  "Yolo",
  "Yuba",
];
const fetcher = (county) => fetch(county).then((res) => res.json());

export async function getLocalData(fileName: string) {
  // Get the path of the json file
  const filePath = path.join(
    process.cwd(),
    "public/datasets/2019-medi-cal-expansions/infant-mortality-data/" +
      fileName +
      ".json"
  );
}

const fillColor = (geo) => {
  console.log("Geo properties name:", geo.properties.name);

  const countyName = geo.properties.name;
  let color = "#d2d2d292"; // Default color

  // getLocalData(countyName).then((data) => {
  //   console.log("Data for county:", countyName, data);

  //   if (data != null) {
  //     color = "#0EA5E9";
  //   }
  // });

  return color;
};

const setCountyData = (geo) => {
  const countyName: string = geo.properties.name;
  console.log("Setting county data for: ", countyName);

  const dispatch = useDispatch();
  dispatch(setCounty(countyName));

  return "#0EA5E9";
};

const MapChart = ({
  setTooltipContent,
}: {
  setTooltipContent: (content: string) => void;
}) => {
  return (
    <div className="flex col-start-2 col-end-3 mt-5">
      <ComposableMap
        width={800}
        height={900}
        projectionConfig={{
          scale: 4500,
          center: [-117, 36.7783], // Centering on California
        }}
      >
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent("");
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: fillColor(geo),
                        outline: "none",
                      },
                      hover: {
                        fill: setCountyData(geo),
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);

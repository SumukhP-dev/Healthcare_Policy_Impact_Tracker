import axios, { AxiosResponse } from "axios";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import React, { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import ReactTooltip from "react-tooltip";
import { Tooltip } from "react-bootstrap";

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

const displayText = (name: string): string => {
  console.log("Displaying text for:", name);

  return name;
};

const MapChart = ({
  setTooltipContent,
}: {
  setTooltipContent: (content: string) => void;
}) => {
  return (
    <div className="flex col-start-2">
      <ComposableMap
        width={700}
        height={1000}
        projectionConfig={{
          scale: 3500,
          center: [-114, 34.7783], // Centering on California
        }}
      >
        <ZoomableGroup>
          <Geographies geography={content}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent("the");
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);

"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tooltip } from "react-tooltip";
import MapChart from "../../components/MapChart";
import LawSelectors from "../../components/LawSelectors";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

export default function App() {
  const [content, setContent] = useState("");

  return (
    <div>
      <LawSelectors />
      <MapChart setTooltipContent={setContent} />
      <Tooltip id="map-tooltip">{content}</Tooltip>
    </div>
  );
}

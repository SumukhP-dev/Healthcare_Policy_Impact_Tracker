"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Tooltip } from "react-tooltip";
import MapChart from "../../components/MapChart";
import LawSelectors from "../../components/LawSelectors";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import TimeLine from "../../components/TimeLine";
import DetailsWidget from "../../components/DetailsWidget";

export default function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="flex h-screen w-screen grid cols-5">
      <LawSelectors />
      <MapChart setTooltipContent={setContent} />
      <DetailsWidget />
      <TimeLine />
    </div>
  );
}

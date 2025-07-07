"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Tooltip } from "react-tooltip";
import MapChart from "../../components/MapChart";
import LawSelectors from "../../components/LawSelectors";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

export default function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    // This effect uses the `value` variable,
    // so it "depends on" `value`.
    console.log(content);
  }, [content]);

  return (
    <div className="flex h-screen w-screen grid cols-5">
      <LawSelectors />
      <MapChart setTooltipContent={setContent} />
      <Tooltip>{content}</Tooltip>
    </div>
  );
}

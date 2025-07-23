"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Tooltip } from "react-tooltip";
import MapChart from "../../components/MapChart";
import LawSelectors from "../../components/LawSelectors";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import TimeLine from "../../components/TimeLine";
import DetailsWidget from "../../components/DetailsWidget";
import { SWRProvider } from "./swr-provider";

export default function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    // This effect uses the `value` variable,
    // so it "depends on" `value`.
    console.log(content);
  }, [content]);

  return (
    <div className="flex h-screen w-screen grid cols-5">
      <SWRProvider>
        <LawSelectors />
        <MapChart setTooltipContent={setContent} />
        <Tooltip>{content}</Tooltip>
        <DetailsWidget />
        <TimeLine />
      </SWRProvider>
    </div>
  );
}

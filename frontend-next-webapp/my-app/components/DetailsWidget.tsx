import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../src/app/store/store.tsx";

export default function BoxSx() {
  const statistics = useSelector((state: RootState) => state.statistics.value);
  const percent = useSelector((state: RootState) => state.percent.value);

  const arrowImagePathSelector = () => {
    console.log(
      "Statistics:  ",
      statistics,
      "Percent: ",
      parseFloat(String(percent))
    );
    let path = "";
    const percentValue = parseFloat(String(percent));

    if (statistics === "Mortality") {
      if (percentValue > 0) {
        path = "/red-up-arrow.png";
      } else if (percentValue < 0) {
        path = "/green-down-arrow.png";
      } else {
        path = "/grey-sideways-arrow.png";
      }
    } else if (statistics === "InfantMortality") {
      if (percentValue > 0) {
        path = "/red-up-arrow.png";
      } else if (percentValue < 0) {
        path = "/green-down-arrow.png";
      } else {
        path = "/grey-sideways-arrow.png";
      }
    } else {
      if (percentValue > 0) {
        path = "/green-up-arrow.png";
      } else if (percentValue < 0) {
        path = "/red-down-arrow.png";
      } else {
        path = "/grey-sideways-arrow.png";
      }
    }

    console.log("Arrow image path:", path);

    return (
      <Image
        src={"/arrows" + path}
        width={100}
        height={100}
        alt="arrow image"
      />
    );
  };

  return (
    <div className="flex col-start-3 col-end-5 m-3 min-w-xl">
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: "#007FFF",
              dark: "#0066CC",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "60%",
            borderRadius: 1,
            bgcolor: "primary.main",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="flex flex-row justify-center items-center block">
            <h1>
              {useSelector((state: RootState) => state.county.value)} <br></br>
              {useSelector((state: RootState) => state.percent.value)}
            </h1>
            {arrowImagePathSelector()}
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

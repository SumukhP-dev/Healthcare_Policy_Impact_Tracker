import * as React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";

export default function BoxSx() {
  return (
    <div className="flex col-start-3 col-end-5 m-5">
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
              San Francisco <br></br>
              Decrease 15%
            </h1>
            <Image
              src="/arrows/down-arrow/green-down-arrow.png"
              width={100}
              height={100}
              alt="arrow image"
            />
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

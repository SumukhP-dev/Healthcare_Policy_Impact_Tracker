"use client";

import { configureStore } from "@reduxjs/toolkit";
import countyReducer from "./features/countySlice";
import percentReducer from "./features/percentSlice";
import yearReducer from "./features/yearSlice";
import statisticsReducer from "./features/statisticsSlice";

export const store = configureStore({
  reducer: {
    county: countyReducer,
    percent: percentReducer,
    year: yearReducer,
    statistics: statisticsReducer,
  },
});

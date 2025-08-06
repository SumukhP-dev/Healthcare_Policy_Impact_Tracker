"use client";

import { configureStore } from "@reduxjs/toolkit";
import countyReducer from "./features/countySlice";
import percentReducer from "./features/percentSlice";
import yearReducer from "./features/yearSlice";
import statisticsReducer from "./features/statisticsSlice";

const store = configureStore({
  reducer: {
    county: countyReducer,
    percent: percentReducer,
    year: yearReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store;

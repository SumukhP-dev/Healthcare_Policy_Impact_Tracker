import { createSlice } from "@reduxjs/toolkit";

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState: { value: "Mortality" },
  reducers: {
    setStatistics: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;

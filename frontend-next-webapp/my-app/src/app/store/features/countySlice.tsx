import { createSlice } from "@reduxjs/toolkit";

export const countySlice = createSlice({
  name: "county",
  initialState: { value: "San Francisco" },
  reducers: {
    setCounty: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { setCounty } = countySlice.actions;

export default countySlice.reducer;

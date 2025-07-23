import { createSlice } from "@reduxjs/toolkit";

export const percentSlice = createSlice({
  name: "percent",
  initialState: { value: 0 },
  reducers: {
    setPercent: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { setPercent } = percentSlice.actions;

export default percentSlice.reducer;

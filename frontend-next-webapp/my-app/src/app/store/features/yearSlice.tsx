import { createSlice } from "@reduxjs/toolkit";

export const yearSlice = createSlice({
  name: "year",
  initialState: { value: 2019 },
  reducers: {
    setYear: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { setYear } = yearSlice.actions;

export default yearSlice.reducer;

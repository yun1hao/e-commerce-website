import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  action: true,
};

export const closeSlice = createSlice({
  name: "countering",
  initialState,
  reducers: {
    open: (state) => {
      state.action = !state.action;
      console.log("22" + state.action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { open } = closeSlice.actions;
export const alldata = async () => {
  const response = await fetch("./alldata").then((data) => data.json());
  console.log(response);
  //return response;
};

export default closeSlice.reducer;

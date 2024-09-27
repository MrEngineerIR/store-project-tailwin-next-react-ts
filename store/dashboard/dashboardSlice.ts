"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  dashboardState: string;
  destinationId: string;
}

const initialState: DashboardState = {
  dashboardState: "order",
  destinationId: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardState: (
      state,
      action: PayloadAction<{ state: string; destinationId: string }>
    ) => {
      state.dashboardState = action.payload.state;
      state.destinationId = action.payload.destinationId;
    },
  },
});

export const { setDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;

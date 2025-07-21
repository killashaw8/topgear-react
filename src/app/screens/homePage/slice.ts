import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularProducts: [],
  trendProducts: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularProducts: (state, action) => {
      state.popularProducts = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const {setPopularProducts, setTrendProducts, setTopUsers} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
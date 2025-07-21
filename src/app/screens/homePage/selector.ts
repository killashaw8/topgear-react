import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTrendProducts = createSelector(
  selectHomePage, 
  (HomePage) => HomePage.trendProducts
);

export const retrievePopularProducts = createSelector(
  selectHomePage, 
  (HomePage) => HomePage.popularProducts
);

export const retrieveTopUsers = createSelector(
  selectHomePage, 
  (HomePage) => HomePage.topUsers
);
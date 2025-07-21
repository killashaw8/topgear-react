import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";

/** REDUX Slice & Selector **/
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({popularProducts})
);

export default function PopularProducts() {
  return (
    <div></div>
  )
};
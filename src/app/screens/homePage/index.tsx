import React, {useEffect} from "react";
import Advertisement from "./Advertisement";
import PopularProducts from "./PopularProducts";
import TopUsers from "./TopUsers";
import TrendProducts from "./TrendProducts";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTrendProducts, setTopUsers, setPopularProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css"

/** REDUX Slice & Selector **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
}); 


export default function HomePage() {
  
  const { setTrendProducts, setPopularProducts, setTopUsers } = actionDispatch(useDispatch());
  
  useEffect(() => {
    // BackEnd server dat fetch => Data
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.BUDGET,
    })
    .then(data => {
      setPopularProducts(data);
    })
    .catch((err) => console.log(err));

    product 
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.LUXURY,
      })
      .then(data => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then(data => {
        setTopUsers(data)
      })
  }, []);

  return (
    <div className={"homepage"}>
      <TrendProducts />
      <PopularProducts />
      <Advertisement />
      <TopUsers />
    </div>
  )
};
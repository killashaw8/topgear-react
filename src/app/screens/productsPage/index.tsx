import React from "react";
import { Route, Routes } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import ChosenProduct from "./ChosenProduct";
import "../../../css/products.css";
import Products from "./Products";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage({ onAdd }: ProductsPageProps) {
  return (
    <div className="products-page">
      <Routes>
        <Route path="/" element={<Products onAdd={onAdd} />} />
        <Route path=":productId" element={<ChosenProduct onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import styled from 'styled-components';
import Radio from "../../components/ui/Radio";


/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data))
});



const productsRetriever = createSelector(
  retrieveProducts, 
  (products) => ({products})
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 6,
    order: "createdAt",
    productCollection: ProductCollection.LUXURY,
    search: "",
  }); 

  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({...productSearch});
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  }

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  }

  const chooseCarHandler = (id: string) => {
    navigate(`/products/${id}`);
  }

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className="top-text">
              <p>TopGear</p>
              <Stack className="single-search-form">
                <input
                  type={"search"} 
                  className="single-search-input"
                  name={"singleSearch"}
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  variant="contained"
                  className="single-button-search"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  SEARCH 
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Radio
                options={[
                  { label: "New", value: "createdAt" },
                  { label: "Price", value: "productPrice" },
                  { label: "Views", value: "productViews" },
                ]}
                value={productSearch.order}
                onChange={searchOrderHandler}
              />
            </Stack>
          </Stack>
          <Stack className={"product-main-section"}>
            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        productSearch.productCollection === ProductCollection.BUDGET
                          ? '#ffcc00'
                          : '#dddddd',
                      color: '#000',
                      '&:hover': {
                        backgroundColor:
                          productSearch.productCollection === ProductCollection.BUDGET
                            ? '#e6b800'
                            : '#cccccc'
                      }
                    }}
                    onClick={() => searchCollectionHandler(ProductCollection.BUDGET)}
                  >
                    Budget
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        productSearch.productCollection === ProductCollection.LUXURY
                          ? '#ffcc00'
                          : '#dddddd',
                      color: '#000',
                      '&:hover': {
                        backgroundColor:
                          productSearch.productCollection === ProductCollection.LUXURY
                            ? '#e6b800'
                            : '#cccccc'
                      }
                    }}
                    onClick={() => searchCollectionHandler(ProductCollection.LUXURY)}
                  >
                    Luxury
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        productSearch.productCollection === ProductCollection.SPORT
                          ? '#ffcc00'
                          : '#dddddd',
                      color: '#000',
                      border: '5px black',
                      '&:hover': {
                        backgroundColor:
                          productSearch.productCollection === ProductCollection.SPORT
                            ? '#e6b800'
                            : '#cccccc'
                      }
                    }}
                    onClick={() => searchCollectionHandler(ProductCollection.SPORT)}
                  >
                    Sport
                  </Button>
                </div>
              </Stack>
            </Stack>
            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack 
                      key={product._id} 
                      className={"product-card"}
                      onClick={() => chooseCarHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{product.productType}</div>
                        <Button 
                          className={"shop-btn"} 
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            })
                            e.stopPropagation();
                          }}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge> 
                        </Button>
                      </Stack> 
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  )
                })
              ) : (
                <Box className={"no-data"}>Products Are Not Available!</Box>
              )}
            </Stack>
          </Stack>
          {/* PAGINATION */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0 
                  ? productSearch.page + 1 
                  : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};
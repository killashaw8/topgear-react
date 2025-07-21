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
    limit: 8,
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
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary" 
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice" ? "primary" : "secondary" 
                }
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews" ? "primary" : "secondary" 
                }
                className={"order"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className={"product-main-section"}>
            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  <Button 
                    variant={"contained"} 
                    color={
                      productSearch.productCollection === ProductCollection.BUDGET 
                      ? "primary"
                      : "secondary"
                    }
                    onClick={() => searchCollectionHandler(ProductCollection.BUDGET)}
                  >
                    Budget
                  </Button>
                  <Button 
                    variant={"contained"} 
                    color={
                      productSearch.productCollection === ProductCollection.LUXURY 
                      ? "primary"
                      : "secondary"
                    }
                    onClick={() => searchCollectionHandler(ProductCollection.LUXURY)}
                  >
                    Luxury
                  </Button>
                  <Button 
                    variant={"contained"} 
                    color={
                      productSearch.productCollection === ProductCollection.SPORT 
                      ? "primary"
                      : "secondary"
                    }
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
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
            style={{ marginTop: "60px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1498.1941163531258!2d69.22756351997904!3d41.3221705122861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b004c0b0e5b%3A0x143556f918fcf0a!2sRaykhon%20Milliy%20Taomlar!5e0!3m2!1sen!2skr!4v1745369452131!5m2!1sen!2skr"
            width="1320"
            height="500"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
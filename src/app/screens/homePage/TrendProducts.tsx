import React from "react";
import { createSelector } from "reselect"
import { retrieveTrendProducts } from "./selector"
import { useSelector } from "react-redux";
import { Box, Container, Stack } from "@mui/material";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

/** REDUX Slice & Selector **/
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({trendProducts})
);

export default function TrendProducts() {
  const { trendProducts } = useSelector(trendProductsRetriever);

  return (
    <div className={"trend-products-frame"}>
      <Container>
        <Stack className={"trend-section"}>
          <Box className={"category-title"}>Trend Cars</Box>
          <Stack className={"cards-frame"}>
            {trendProducts.length !== 0 ? (
              trendProducts.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card className={"card"}>
                      <CardCover>
                        <img src={imagePath} alt="" />
                      </CardCover>
                      <CardCover className={"card-cover"}/>
                      <CardContent sx={{ justifyContent: 'flex-end' }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography 
                            level="h2"
                            fontSize="lg" 
                            textColor="#fff"
                            mb={1}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex"
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon
                              sx={{fontSize: 25, marginLeft: "5px"}}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px"
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon/>}
                          textColor="neutral.300"
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className={"no-data"}>Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  )
};
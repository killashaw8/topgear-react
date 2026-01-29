import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { useSelector } from "react-redux";
import { Box, Container, Stack } from "@mui/material";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { CssVarsProvider } from "@mui/joy/styles/CssVarsProvider";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useNavigate } from "react-router-dom";

/** REDUX Slice & Selector **/
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({popularProducts})
);

export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);
  const navigate = useNavigate();

  const handleCardClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Cars</Box>
          <Stack className="cards-frame">
            {popularProducts.length !== 0 ? (
              popularProducts.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card
                      className={"card"}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCardClick(product._id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleCardClick(product._id);
                        }
                      }}
                      sx={{ cursor: "pointer" }}
                    >
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
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  )
};

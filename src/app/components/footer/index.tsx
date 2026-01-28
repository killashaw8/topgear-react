import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 40px;
  display: flex;
  background: #343434;
  background-size: cover;

  @media only screen and (max-width: 767px) {
    padding-bottom: 28px;
  }
`;

export default function Footer() {
  return (
    <Footers>
      <Container>
        <Stack className="footer-main" flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack className="footer-brand" flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"100px"} src={"/img/logo.png"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              Focused on innovation and customer satisfaction, <br/>
              TopGear aims to redefine the car showroom experience. <br/>
              We connect people with their dream cars through trust, technology, and style.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack className="footer-links" sx={{ ml: "180px", gap: "80px" }} flexDirection={"row"}>
            <Stack className="footer-column">
              <Box>
                <Box className={"foot-category-title"}>Company</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  <Link to="/help">Help</Link>
                  <Link to="/help">Contact</Link>
                </Box>
              </Box>
            </Stack>
            <Stack className="footer-column">
              <Box>
                <Box className={"foot-category-title"}>Support</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/help">FAQs</Link>
                  <Link to="/help">Contact</Link>
                  <Link to="/help">Terms</Link>
                </Box>
              </Box>
            </Stack>
            <Stack className="footer-column">
              <Box>
                <Box className={"foot-category-title"}>Contact</Box>
                <Box className={"foot-category-link"}>
                  <a href="mailto:medibridgeapp@gmail.com">
                    Email: medibridgeapp@gmail.com
                  </a>
                  <a href="tel:010-5689-9698">
                    Phone: +82 (010) 5689-9698
                  </a>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          className="footer-separator"
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <p className={"copyright-txt footer-copyright"}>
          © <span className="copyright-brand">TopGear</span> owned by{" "}
          <a
            className="copyright-owner"
            href="https://linktr.ee/killashaw8"
            target="_blank"
            rel="noreferrer"
          >
            Rahimjon Halimov
          </a>
        </p>
      </Container>
    </Footers>
  );
}

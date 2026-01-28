import { Box, Button, Container, Stack } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";

interface HeaderProps {
  openSignup: () => void;
}

export default function Header(props: HeaderProps) {
  
  const {
    openSignup,
  } = props
  const {authMember} = useGlobals();

  return(
    <div className="home-header">
      <Container className="header-container ">
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>
              The best car showroom in the town
            </Box>
            <Box className={"wel-txt"}>
              Your trust our pride!
            </Box>
            <Box className={"service-txt"}>
              Rental service coming soon...
            </Box>
            <Box className={"signup"}>
              {!authMember ? (
                <Button 
                  variant={"contained"} 
                  className={"signup-button"}
                  onClick={openSignup}
                  >
                    SIGN UP
                </Button>
                  ) : null}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
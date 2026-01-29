import { Box, Container, Stack } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { useNavigate } from "react-router-dom";
import { Settings } from "./Settings";
import "../../../scss/userPage.scss";
import PublicUserCard from "../../components/user/PublicUserCard";


export default function UserPage() {
  const navigate = useNavigate();
  const { authMember } = useGlobals();

  if (!authMember) navigate("/")
  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            {authMember ? (
              <PublicUserCard member={authMember} className="public-user-card" />
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

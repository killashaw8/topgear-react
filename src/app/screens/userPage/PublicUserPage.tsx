import { Box, Container, Stack } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { Member } from "../../../lib/types/member";
import "../../../scss/userPage.scss";
import PublicUserCard from "../../components/user/PublicUserCard";

interface LocationState {
  member?: Member;
}

export default function PublicUserPage() {
  const location = useLocation();
  const { memberId } = useParams();
  const state = location.state as LocationState | null;
  const member = state?.member;

  if (!member) {
    return (
      <div className={"user-page public-user-page"}>
        <Container>
          <Stack className={"my-page-frame"}>
            <Box className={"order-info-box"}>
              <Box className={"order-user-name"}>User profile unavailable</Box>
              <Box className={"order-user-prof"}>
                We couldn't load user {memberId ? `(${memberId})` : ""}.
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>
    );
  }

  return (
    <div className={"user-page public-user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <PublicUserCard member={member} className="public-user-card" />
        </Stack>
      </Container>
    </div>
  );
}

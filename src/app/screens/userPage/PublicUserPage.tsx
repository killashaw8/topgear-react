import { Box, Card, CardContent, CardMedia, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useParams } from "react-router-dom";
import { MemberType } from "../../../lib/enums/member.enum";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import "../../../scss/userPage.scss";

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
          <Card
            sx={{
              width: "100%",
              maxWidth: 420,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", width: "100%", paddingTop: "100%" }}>
              <CardMedia
                component="img"
                image={
                  member.memberImage
                    ? `${serverApi}/${member.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt={member.memberNick}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <CardContent>
              <Stack spacing={1.5} alignItems="center">
                <Box className={"public-user-name"}>{member.memberNick}</Box>
                <Box className={"public-user-type"}>{member.memberType}</Box>
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  className={"public-user-location"}
                >
                  <LocationOnIcon fontSize="small" />
                  <span>{member.memberAddress ? member.memberAddress : "No address"}</span>
                </Stack>
                <Box className={"user-media-box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <TwitterIcon />
                </Box>
                <Box className={"user-desc"}>
                  {member.memberDesc ? member.memberDesc : "No description"}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}

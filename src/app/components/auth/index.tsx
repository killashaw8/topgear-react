import React, { useState } from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaperStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2),
}));


const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  authMode: "signup" | "login" | null;
  handleClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { authMode, handleClose } = props;
  const [ memberNick, setMemberNick ] = useState<string>("");
  const [ memberPhone, setMemberPhone ] = useState<string>("");
  const [ memberPassword, setMemberPassword ] = useState<string>("");
  const { setAuthMember } = useGlobals();
  

  /** HANDLERS **/

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (authMode === "signup") await handleSignupRequest();
    else if (authMode === "login") await handleLoginRequest();
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if(!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleClose();
    } catch (err) {
      console.log(err);
      handleClose();
      sweetErrorHandling(err).then();
    }
  }

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if(!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleClose();
    } catch (err) {
      console.log(err);
      handleClose();
      sweetErrorHandling(err).then();
    }
  }

  return (
    <div>
      {/* Signup Modal */}
      <StyledModal
        aria-labelledby="signup-title"
        aria-describedby="signup-description"
        open={authMode === "signup"} 
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={authMode === "signup"}>
          <StyledPaperStack direction="row" sx={{ width: "800px" }}>
            <ModalImg src="/img/auth.webp" alt="camera" />
            <Stack sx={{ ml: 6, alignItems: "center" }}>
              <h2 id="signup-title">Signup Form</h2>
              <p id="signup-description" style={{ display: "none" }}>
                Fill in your details to register
              </p>
              <TextField
                sx={{ mt: 1 }}
                label="Username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ my: 2 }}
                label="Phone Number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ mt: 4, width: 120 }}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </StyledPaperStack>
        </Fade>
      </StyledModal>

      {/* Login Modal */}
      <StyledModal
        aria-labelledby="login-title"
        aria-describedby="login-description"
        open={authMode === "login"} 
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={authMode === "login"}>
          <StyledPaperStack direction="row" sx={{ width: "700px" }}>
            <ModalImg src="/img/auth.webp" alt="camera" />
            <Stack sx={{ ml: 6, mt: 3, alignItems: "center" }}>
              <h2 id="login-title">Login Form</h2>
              <p id="login-description" style={{ display: "none" }}>
                Enter credentials to log in
              </p>
              <TextField
                label="Username"
                variant="outlined"
                sx={{ my: 1 }}
                onChange={handleUsername}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ mt: 3, width: 120 }}
                variant="extended"
                color="primary"
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </StyledPaperStack>
        </Fade>
      </StyledModal>
    </div>
  );
}

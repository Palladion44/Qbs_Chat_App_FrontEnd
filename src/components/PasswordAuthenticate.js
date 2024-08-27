import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import Avatar from "../assets/Avatar.png";
import background from "../assets/background.jpg";
import centeredImage from "../assets/image_login.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { passwordcheck, setStep } from "../features/auth/authSlice";
// import { passwordcheck} from '../features/auth/actions';
// import { setStep } from '../features/auth/reducers';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AllChats from "./AllChats";

const PasswordAuthenticate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, registrationMessage, error, token, phone_number, step } =
    useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleContinue = async () => {
    try {
      const action = await dispatch(passwordcheck({ phone_number, password }));
      console.log("Dispatched passwordcheck action", action);
      if (passwordcheck.fulfilled.match(action)) {
        if (action.payload) {
          alert("I am here");
          console.log(
            "The token value from action.payload is: ",
            action.payload.token
          );
          
          dispatch(setStep("allchats"));
          navigate("/AllChats");
        } else {
          setSnackbarMessage(action.payload.message || "Password is incorrect");
          setOpenSnackbar(true);
        }
      } else {
        setSnackbarMessage(error.message || "An error occurred");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage("An unexpected error occurred");
      setOpenSnackbar(true);
    }
  };

  // useEffect(() => {
  //   console.log("Token in state:", token);
  //   if (status === 'succeeded' && registrationMessage) {
  //     navigate('/AllChats');
  //   }
  // }, [status, registrationMessage, navigate, token]); // Add token as a dependency

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", width: "120%", boxShadow: 3 }}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderTopRightRadius: "5%",
            borderBottomRightRadius: "5%",
            overflow: "hidden",
          }}
        >
          <img
            src={background}
            alt="Background"
            style={{ width: "100%", height: "100vh" }}
          />
          <img
            src={centeredImage}
            alt="Centered"
            style={{ position: "absolute", width: "60%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{ mb: 2, fontFamily: "Poppins", fontWeight: "bold" }}
            >
              Login Now
            </Typography>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                marginBottom: 2,
              }}
            >
              <img
                src={Avatar}
                alt="User Avatar"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </Box>
            <Box>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    "& .MuiInputBase-input": {
                      height: "30px",
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#1F487C",
                borderRadius: "50px",
                width: "200px",
                height: "40px",
                "&:hover": { backgroundColor: "#1F487C" },
              }}
              onClick={handleContinue}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordAuthenticate;

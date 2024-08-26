import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setStep, setPhoneNumber } from "../features/auth/authSlice";
import background from '../assets/background.jpg';
import centeredImage from "../assets/image_login.png";

const Login = () => {
  const [phone_number, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { status, registrationMessage, error } = useSelector(
    (state) => state.auth
  );
  const { step } = useSelector((state) => state.auth);

  const handlePhoneChange = (value) => {
    setPhone(value);
    console.log(value);
  };

  const handleLogin = async () => {
    try {
      const action = await dispatch(login(phone_number));
      if (login.fulfilled.match(action)) {
        if (action.payload) {
          dispatch(setPhoneNumber(phone_number)); // Save phone number in redux store
          navigate("/PasswordAuthenticate");
        } else {
          setSnackbarMessage(
            action.payload.message || "Phone number is not available"
          );
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

  return (
    <Container
      disableGutters
      maxWidth={false}
            sx={{
        display: 'flex',     
        height: '100vh',
        backgroundColor: '#ffff',
      
        margin:0,
        padding:0,
      }}
    >
      <Box
        sx={{
          width: '43%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderTopRightRadius: '5%',
          margin: '0',
          borderBottomRightRadius: '5%',
          backgroundImage: `url(${background})`, // Use the imported image
          backgroundSize: 'cover',
        }}
         
       >
         <img src={centeredImage} alt="Centered" style={{ position: 'absolute', width: '70%', height: 'auto' }} />
       </Box>

      <Box
        sx={{
          width: '57%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#ffff',
        
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "poppins",
            fontWeight: "bold",
            fontSize: "2.0rem",
          }}
        >
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "poppins",
            fontSize: "1.6rem",
            fontWeight: "medium",
          }}
        >
          Enter Your Phone Number and Password
        </Typography>
        <Box width={"100%"} >
          <PhoneInput
            country={"pk"}
            value={phone_number}
            onChange={handlePhoneChange}
            inputStyle={{ width: "84%" }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1F487C",
            width: "14%",
            borderRadius: "50px",
            height: "7%",
            "&:hover": {
              backgroundColor: "#1F487C",
            },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

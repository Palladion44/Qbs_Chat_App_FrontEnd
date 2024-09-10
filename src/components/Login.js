import React, { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setStep, setPhoneNumber } from "../features/auth/authSlice";
import background from '../assets/background.jpg';
import centeredImage from "../assets/image_login.png";
import { Snackbar, Alert } from '@mui/material';

import './InputPhoneStyling.css'; // Import your global CSS file

const Login = () => {
  const { error } = useSelector((state) => state?.auth);
  const [phone_number, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handlePhoneChange = (value) => {
    setPhone(value);
    // console.log(value);
  };
useEffect(() => {
if(error !== undefined )
  setSnackbarMessage(error?.message);
setOpenSnackbar(true);
}, [error])


  const handleLogin = async () => {
    try {
      const action = await dispatch(login(phone_number));
      if (login.fulfilled.match(action)) {
        if (action.payload) {
          dispatch(setPhoneNumber(phone_number)); // Save phone number in redux store
          navigate("/PasswordAuthenticate");
        } else {
          setOpenSnackbar(true);
        }
      } else {

        setOpenSnackbar(true);
      }
    } catch (err) {

      setOpenSnackbar(true);
    }
  };

  return (
    <Container
    disableGutters
    maxWidth={false}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
     
    }}
    >
      <Box
        sx={{
          width: '43%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
        }}
      >
        <img src={background} alt="Background" style={{ width: '100%', height: '100vh',borderTopRightRadius: '24px',
          borderBottomRightRadius: '24px', }} />
        <img src={centeredImage} alt="Centered" style={{ position: 'absolute', width: '60%', height: 'auto' }} />
      </Box>

      <Box
        sx={{
          width: '57%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          '@media (max-width: 425px)': {
            width: '100%',
          },
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontFamily: 'poppins', fontWeight: 'bold', fontSize: '2.0rem' }}>
          Login
        </Typography>
        <Typography variant="subtitle1" sx={{fontFamily: 'poppins', fontSize: '1.6rem', fontWeight: 'medium' }}>
          Enter Your Phone Number
        </Typography>
        <Typography variant="body" sx={{ mb: 5, textAlign: 'center', fontFamily: 'poppins', fontSize: '1rem'  }}>
          Please confirm your country code and enter your phone number
        </Typography>
        <Box sx={{mr:30}} >
          <PhoneInput
            country={"pk"}
            placeholder="Phone Number"
            value={phone_number}
            onChange={handlePhoneChange}
            inputClass="form-control" // Apply custom class if needed
            buttonClass="custom-dropdown-button"


          />
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform:"capitalize",
            mt: 5,
            backgroundColor: "#1F487C",
            width: "24%",
            borderRadius: "50px",
            height: "7%",
            boxShadow:"none",
            "&:hover": {
              backgroundColor: "#1F487C",
            boxShadow:"none",
            },
          }}
          onClick={handleLogin}
        >
          Continue
        </Button>
      </Box>
      <Snackbar
      open={openSnackbar}
      autoHideDuration={11000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Container>
  );
};

export default Login;

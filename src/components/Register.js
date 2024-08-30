import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Snackbar } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../features/auth/actions';
// import {setPhoneNumber,setStep} from '../features/auth/reducers'
import { register, setPhoneNumber, setStep } from '../features/auth/authSlice';
import background from '../assets/background.jpg';
import centeredImage from '../assets/image_login.png';
import '@fontsource/poppins/700.css'; // Import the Poppins font
import '@fontsource/poppins/600.css'; // Import the Poppins font
import { country_codes_and_flags } from './helpers/countrydata';
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";


const Register = () => {
  const [phone_number, setPhone] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, registrationMessage, error } = useSelector((state) => state.auth);
  const { step } = useSelector((state) => state.auth);

  const handlePhoneChange = (value) => {
    setPhone(value);
    console.log(value);
  };

  const handleContinue = async () => {
    try {
      const action = await dispatch(register(phone_number));
      if (register.fulfilled.match(action)) {
        alert("i am here")
         console.log(action.payload)
        if (action.payload) {
          alert("i am here")
          dispatch(setPhoneNumber(phone_number)); // Save phone number in redux store
          console.log(step);
          navigate('/Profile'); 
        } else {
          setSnackbarMessage(action.payload.message || 'Phone number is not available');
          setOpenSnackbar(true);
        }
      } else {
        setSnackbarMessage(error.message || 'An error occurred');
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage('An unexpected error occurred');
      setOpenSnackbar(true);
    }
  };

  // useEffect(() => {
  //   if ( registrationMessage) {
  //     navigate('/Profile');
  //   }
  // }, [status, registrationMessage, navigate]);

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
          borderTopRightRadius: '5%',
          borderBottomRightRadius: '5%',
        }}
      >
        <img src={background} alt="Background" style={{ width: '100%', height: '100vh',borderTopRightRadius: '24px',
          borderBottomRightRadius: '24px' }} />
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
          Register Now
        </Typography>
        <Typography variant="subtitle1" sx={{fontFamily: 'poppins', fontSize: '1.6rem', fontWeight: 'medium' }}>
          Enter Your Phone Number
        </Typography>
        <Typography variant="body" sx={{ mb: 5, textAlign: 'center', fontFamily: 'poppins', fontSize: '1rem'  }}>
          Please confirm your country code and enter your phone number
        </Typography>
        <Box sx={{ mr: 30 }}>
          <PhoneInput
            disableGutters
            country={'pk'}
            value={phone_number}
            onChange={handlePhoneChange}
            inputStyle={{ width: '200%' }}
          />
        </Box>
        <Button
          variant="contained"
          lowerCase
          sx={{
            mt: 2,
            backgroundColor: '#1F487C',
            width: '19%',
            borderRadius: '50px',
            height: '9%',
            fontFamily:"Poppins",
            '&:hover': {
              backgroundColor: '#1F487C',
            },
          }}
          onClick={handleContinue}
        >
          test
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
};

export default Register;

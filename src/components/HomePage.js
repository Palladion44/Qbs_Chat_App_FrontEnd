
// import React, { useState,useEffect } from 'react';
// import { Box, Button, Container, Typography  } from '@mui/material';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch,useSelector } from 'react-redux';
// import { login,setStep, setPhoneNumber } from '../features/auth/authSlice';
// import background from '../assets/background.jpg';
// import centeredImage from '../assets/image_login.png';
// import image from '../assets/qbs-lets-get-better-final-logo.png';


// const HomePage = () => {
//   const [phone_number, setPhone] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const { status, registrationMessage, error } = useSelector((state) => state.auth);
//   const { step } = useSelector((state) => state.auth);

//   const handlePhoneChange = (value) => {
//     setPhone(value);
//     console.log(value);
//   };

//   const handleLogin = async () => {
  
//   };

 

//   return (
//     <Container
//       disableGutters
//       maxWidth={false}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         height: '100vh',
//       }}
//     >
//       <Box
//         sx={{
//           width: '50%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'relative',
//           borderTopRightRadius: '5%',
//           borderBottomRightRadius: '5%',
//           overflow: 'hidden',
//         }}
//       >
//         <img src={background} alt="Background" style={{ width: '100%', height: '100vh' }} />
//         <img src={centeredImage} alt="Centered" style={{ position: 'absolute', width: '60%', height: 'auto' }} />
//       </Box>
//       <Box
//         sx={{
//           width: '50%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: 4,
//           '@media (max-width: 425px)': {
//             width: '100%',
//           },
//         }}
//       >
//         <img src={image} alt="QBS" style={{ width: '40%', height: '40%' }} />
//         <Typography variant="h4" sx={{ mb: 2, fontFamily: 'poppins', fontWeight: 'bold', fontSize: '2.0rem' }}>
//           Login
//         </Typography>
//         <Typography variant="subtitle1" sx={{ mb: 2, fontFamily: 'poppins', fontSize: '1.6rem', fontWeight: 'medium' }}>
//           Enter Your Phone Number and Password
//         </Typography>
//         <Box width={'100%'} sx={{ml:9}} >
//         <PhoneInput
//           country={'pk'}
//           value={phone_number}
//           onChange={handlePhoneChange}
//           inputStyle={{ width: '84%' }}
//         />
//       </Box>
//         <Button
//           variant="contained"
//           sx={{
//             mt: 2,
//             backgroundColor: '#1F487C',
//             width: '14%',
//             borderRadius: '50px',
//             height: '7%',
//             '&:hover': {
//               backgroundColor: '#1F487C',
//             },
//           }}
//           onClick={handleLogin}
//         >
//           Login
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default HomePage;


import React, { useState,useEffect } from 'react';
import { Box, Button, Container, Typography  } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { login,setStep, setPhoneNumber } from '../features/auth/authSlice';
import background from '../assets/background.jpg';
import centeredImage from '../assets/image_login.png';
import image from '../assets/qbs-lets-get-better-final-logo.png';
import '@fontsource/poppins/700.css'; // Import the Poppins font
import '@fontsource/poppins/600.css'; // Import the Poppins font



const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
  navigate('./Login')
  };

  const handleRegister = () => {
    navigate('./Register')

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
      {/* <Box
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={centeredImage}
          alt="Centered"
          style={{
            width: '70%',
            height: 'auto',
            position: 'absolute',
            zIndex: 1,
          }}
        />
      </Box> */}
       <Box
         sx={{
           width: '43%',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         position: 'relative',
         borderTopRightRadius: '5%',
         margin:'0',
          borderBottomRightRadius: '5%',
          backgroundImage: `url(${background} )`,
          backgroundSize:'cover',
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
        <img
          src={image}
          alt="QBS Logo"
          style={{
            width: '60%',
            height: 'auto',
            marginBottom: '50px',
          }}
        /> 
        <Typography  sx={{ fontSize: {
        xs: '1.5rem', // 0px and up
        sm: '1.8rem',   // 600px and up
        md: '2rem', // 900px and up
        lg: '2rem',   // 1200px and up
      },fontFamily: 'Poppins',fontWeight:'700', color: '#1F487C', mb: 2 }}>
          Connect easily with your QBS family
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            gap: '10px',
            mb: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: '9vw',
              height: '5vh',
              borderRadius: '20px',
              padding: '10px 30px',
              fontSize: '16px',
              textTransform: 'none',
              fontWeight:'600',
              borderColor: '#1F487C',
              color: '#1F487C',
              '&:hover': {
                backgroundColor: '#1F487C',
                color: '#fff',
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: '9vw',
              height: '5vh',
              color: '#fff',
              borderRadius: '20px',
              padding: '10px 30px',
              fontSize: '16px',
              fontWeight:'600',
              borderColor: '#49B35E',
              border:'none',
              textTransform: 'none',
              backgroundColor: '#49B35E',
              '&:hover': {
                backgroundColor: '#ffff',
                color: '#49B35E',
                boxShadow: 'none',
              borderColor: '#49B35E',

              },
              boxShadow: 'none',
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{color:'#1F487C', fontFamily: 'Poppins',fontWeight:'600', fontSize: '14px' }}>
          Terms & Privacy Policy
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;

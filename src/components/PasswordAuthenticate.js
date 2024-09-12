import React, { useState, useEffect,useRef} from "react";
import { Box, Button, Container, Typography, TextField,Snackbar,Alert } from "@mui/material";
import Avatar from "../assets/DefaultProfileImage.png";
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
  const isFirstRender = useRef(true); // Track the first render


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the first render
      isFirstRender.current = false;
      return;
    }

    if (error !== undefined) {
      setSnackbarMessage(error?.message);
      setOpenSnackbar(true);
    }
  }, [error]);


  const handleContinue = async () => {
    try {
      const action = await dispatch(passwordcheck({ phone_number, password }));
      // console.log("Dispatched passwordcheck action", action);
      if (passwordcheck.fulfilled.match(action)) {
        if (action.payload) {
          alert("I am here");
          // console.log(
          //   "The token value from action.payload is: ",
          //   action.payload.token
          // );
          
          dispatch(setStep("allchats"));
          navigate("/AllChats");
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
      }}
    >
        <Box
          sx={{
            width: "43%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderTopRightRadius: "5%",
            borderBottomRightRadius: "5%",
          }}
        >
        <img src={background} alt="Background" style={{ width: '100%', height: '100vh',borderTopRightRadius: '24px',
          borderBottomRightRadius: '24px' }} />
        <img src={centeredImage} alt="Centered" style={{ position: 'absolute', width: '60%', height: 'auto' }} />
          
        </Box>
        <Box
          sx={{
            width: "57%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            gap:2.5
          }}
        >
            <Typography
              variant="h4"
              sx={{ mb: 2, fontFamily: "Poppins", fontWeight: "bold" }}
            >
              Login Now
            </Typography>
           
              <img
                src={Avatar}
                alt="User Avatar"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
           
                <TextField
                  variant="filled"

                      label="Password"
                  margin="none"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    disableUnderline: true, // This removes the underline in filled variant
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"  // Add this to align the icon correctly

                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                  sx={{
                    width: "50%",
                fontFamily:"Poppins",
                    
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F7F7FC",
                      paddingLeft: "10px",
                      height: "59px",
                      borderRadius: "4px",
                      "&:before": {
                        borderBottom: "none",
                      },
                      "&:after": {
                        borderBottom: "none",
                      },
                    },
                    "& .MuiInputBase-input": {
                      padding: 0,
                    },
                    "& .MuiInputLabel-root": {
                fontFamily:"Poppins",
            
                      top: "0px",
                      color: "#ADB5BD",
                    },
                    "& .MuiInputLabel-shrink": {
                fontFamily:"Poppins",
            
                      top: "-25px",
                      left: "4px",
                      fontSize: "1em",
                      color: "#ADB5BD",
                    },
                  }}
                />
            <button
  style={{
    marginTop: "16px",  // mt: 2 (MUI spacing unit equivalent)
    backgroundColor: "#1F487C",
    textTransform: "capitalize",  // Capitalize the first letter of the text
    width: "35%",  // Adjust width
    borderRadius: "50px",
    fontFamily: "Poppins, sans-serif",  // Apply Poppins font
    height: "52px",  // Set button height
    color: "white",  // Text color (corrected spelling from "whtie")
    border: "none",  // No border
    boxShadow: "none",  // Remove any default shadow
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",  // Smooth transition for hover effects
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#1F487C";  // Hover background color
    e.target.style.color = "white";  // Keep text color white
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#1F487C";  // Reset background on hover out
    e.target.style.color = "white";  // Reset text color
  }}
  onClick={handleContinue}  // Add your click handler
>
  Login
</button>

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

export default PasswordAuthenticate;

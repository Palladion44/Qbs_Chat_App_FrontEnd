  import { Box, Button, Container, TextField, Typography } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import Avatar from "../assets/Avatar.png";
  import AddCircleIcon from "@mui/icons-material/AddCircle";
  import background from "../assets/background.jpg";
  import centeredImage from "../assets/image_login.png";
  import { useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import IconButton from "@material-ui/core/IconButton";
  import Input from "@material-ui/core/Input";
  import InputLabel from "@material-ui/core/InputLabel";
  import InputAdornment from "@material-ui/core/InputAdornment";
  import FormControl from "@material-ui/core/FormControl";
  import Visibility from "@material-ui/icons/Visibility";
  import VisibilityOff from "@material-ui/icons/VisibilityOff";
  import { save_info, setPhoneNumber } from "../features/auth/authSlice";
  import { FilledInput } from "@mui/material";
  import "@fontsource/poppins/700.css"; // Import the Poppins font
  import "@fontsource/poppins/600.css"; // Import the Poppins font
  import "@fontsource/poppins/400.css";
  import "@fontsource/poppins/500.css";

  const ProfileAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, step } = useSelector((state) => state.auth);
  
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    // Validation states
    const [firstNameError, setFirstNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  
    const handleContinue = () => {
      // Reset errors
      setFirstNameError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
    
      // Validate required fields
      let hasError = false;
    
      if (!first_name.trim()) {
        setFirstNameError(true);
        hasError = true;
      }
    
      if (!password.trim()) {
        setPasswordError(true);
        hasError = true;
      }
    
      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
        hasError = true;
      }
    
      if (hasError) return;
    
      // Clean up first and last names
      const cleanedFirstName = first_name.trim().replace(/\s+/g, ' ');
      const cleanedLastName = last_name.trim().replace(/\s+/g, ' ');
    
      // If all validations pass, dispatch the save_info action and navigate
      dispatch(save_info({ first_name: cleanedFirstName, last_name: cleanedLastName, password, confirmPassword }));
      navigate("/RoleSelect");
    };
    
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
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
          <img
            src={background}
            alt="Background"
            style={{
              width: "100%",
              height: "100vh",
              borderTopRightRadius: "24px",
              borderBottomRightRadius: "24px",
            }}
          />
          <img
            src={centeredImage}
            alt="Centered"
            style={{ position: "absolute", width: "60%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{
            width: "57%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 4,
            gap: 2.5,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 2, fontFamily: "Poppins", fontWeight: "bold" }}
          >
            Register Now
          </Typography>
  
          <TextField
            label="First Name (Required)"
            margin="none"
            variant="filled"
            required

            InputProps={{
              disableUnderline: true,
            }}
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError} // Show error state
            helperText={firstNameError ? "First name is required" : ""} // Display helper text
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "#F7F7FC",
                paddingLeft: "10px",
                height: "59px",
              },
              "& .MuiInputBase-input": {
                padding: 0,
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Poppins",
                top: "0px",
                color: "#ADB5BD",
              },
              "& .MuiInputLabel-shrink": {
                fontFamily: "Poppins",
                top: "-25px",
                left: "4px",
                fontSize: "1em",
                color: "#ADB5BD",
              },
              borderRadius: "4px",
              width: "50%",
              fontFamily: "Poppins",
            }}
          />
                  <TextField
          label="Last Name (Optional)"
          margin="none"
          variant="filled"
          InputProps={{
            disableUnderline: true,
          }}
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          sx={{
            "& .MuiFilledInput-root": {
              backgroundColor: "#F7F7FC",
              paddingLeft: "10px",
              height: "59px",
            },
            "& .MuiInputBase-input": {
              padding: 0,

              // Adjust padding for correct placeholder positioning
            },
            "& .MuiInputLabel-root": {
              fontFamily: "Poppins",

              top: "0px", // Adjust label position if needed
              color: "#ADB5BD",
            },
            "& .MuiInputLabel-shrink": {
              fontFamily: "Poppins",

              top: "-25px", // Position of the label when shrunk
              left: "4px", // Position of the label when shrunk
              fontSize: "1em", // Font size when shrunk
              color: "#ADB5BD",
            },
            fontFamily: "Poppins",

            borderRadius: "4px",
            width: "50%",
          }}
        />
          <TextField
            label="Password"
            margin="none"
            variant="filled"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            error={passwordError} // Show error state
            helperText={passwordError ? "Password is required" : ""}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "50%",
              "& .MuiFilledInput-root": {
                backgroundColor: "#F7F7FC",
                paddingLeft: "10px",
                height: "59px",
                borderRadius: "4px",
              },
              "& .MuiInputBase-input": {
                padding: 0,
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Poppins",
                top: "0px",
                color: "#ADB5BD",
              },
              "& .MuiInputLabel-shrink": {
                top: "-25px",
                left: "4px",
                fontSize: "1em",
                color: "#ADB5BD",
              },
            }}
          />
  
          <TextField
            variant="filled"
            label="Confirm Password"
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
            error={confirmPasswordError} // Show error state
            helperText={
              confirmPasswordError ? "Passwords do not match" : ""
            }
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "50%",
              "& .MuiFilledInput-root": {
                backgroundColor: "#F7F7FC",
                paddingLeft: "10px",
                height: "59px",
                borderRadius: "4px",
              },
              "& .MuiInputBase-input": {
                padding: 0,
              },
              "& .MuiInputLabel-root": {
                fontFamily: "Poppins",
                top: "0px",
                color: "#ADB5BD",
              },
              "& .MuiInputLabel-shrink": {
                top: "-25px",
                left: "4px",
                fontSize: "1em",
                color: "#ADB5BD",
              },
            }}
          />
  
          <button
            style={{
              marginTop: "16px",
              backgroundColor: "#1F487C",
              textTransform: "capitalize",
              width: "35%",
              borderRadius: "50px",
              fontFamily: "Poppins, sans-serif",
              height: "52px",
              boxShadow: "none",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleContinue}
          >
            Continue
          </button>
        </Box>
      </Container>
    );
  };
  export default ProfileAccount;

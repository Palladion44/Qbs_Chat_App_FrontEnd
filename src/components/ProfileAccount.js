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

  // useEffect(() => {
  //   if (step === 'roleSelect') {
  //     console.log(step)
  //     navigate('/RoleSelect');
  //   }
  // }, [step, navigate,dispatch]);

  const handleContinue = () => {
    if (password === confirmPassword) {
      dispatch(save_info({ first_name, last_name, password, confirmPassword }));
      navigate("/RoleSelect");
    } else {
      alert("Passwords do not match");
    }
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
          InputProps={{
            disableUnderline: true,
          }}
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
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
          variant="filled" // or "outlined" if you prefer
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            disableUnderline: true, // This removes the underline in filled variant
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end" // Add this to align the icon correctly
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "50%",
            fontFamily: "Poppins",

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
          }}
        />

        <TextField
          variant="filled"
          label="Confirm Password"
          id="confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            disableUnderline: true, // Removes the underline in filled variant
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end" // Add this to align the icon correctly
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "50%",
            fontFamily: "Poppins",
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
    marginTop: "16px",  // mt: 2 in Material-UI (spacing unit)
    backgroundColor: "#1F487C",
    textTransform: "capitalize",  // Ensures the text is not uppercase
    width: "35%",  // Adjust width as needed
    borderRadius: "50px",
    fontFamily: "Poppins, sans-serif",  // Font family
    height: "52px",
    boxShadow: "none",
    color: "white",  // Text color
    border: "none",  // No border
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#1F487C";  // Hover effect
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#1F487C";  // Reset hover effect
  }}
  onClick={handleContinue}  // Add your click handler
>
  Continue
</button>

      </Box>
    </Container>
  );
};

export default ProfileAccount;

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
// import { save_info,setPhoneNumber} from "../features/auth/reducers";

const ProfileAccount = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, step } = useSelector((state) => state.auth);

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
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "120%",
          boxShadow: 3,
        }}
      >
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
              Register Now
            </Typography>

            <Box sx={{ position: "relative", display: "inline-block" }}>
              <img
                src={Avatar}
                alt="User Avatar"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
              <AddCircleIcon
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  borderRadius: "50%",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box disableGutters sx={{ width: "100%" }}>
              <TextField
                label="First Name (Required)"
                variant="outlined"
                margin="normal"
                fullWidth
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F7F7FC",
                  },
                  "& .MuiInputBase-root": {
                    height: "50px",
                  },
                  width: "100%",
                  height: "100%",
                }}
              />
              <TextField
                label="Last Name (Optional)"
                variant="outlined"
                margin="normal"
                fullWidth
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F7F7FC",
                  },
                  "& .MuiInputBase-root": {
                    height: "50px",
                  },
                  width: "100%",
                  height: "100%",
                }}
              />
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
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#1F487C",
                  width: "44%",
                  borderRadius: "50px",
                  height: "7%",
                  "&:hover": {
                    backgroundColor: "#1F487C",
                  },
                }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileAccount;

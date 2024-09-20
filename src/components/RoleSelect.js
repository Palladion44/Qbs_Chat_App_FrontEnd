import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import background from "../assets/background.jpg";
import centeredImage from "../assets/image_login.png";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetails,fetchDepartments,fetchRoles } from "../features/auth/authSlice"; // Import register
import Avatar from "../assets/PlaceHolderForProfileImage.png"
// import { userDetails } from '../features/auth/actions';
import "@fontsource/poppins/700.css"; // Import the Poppins font
import "@fontsource/poppins/600.css"; // Import the Poppins font
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";

const RoleSelect = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [imagex, setUploadedImgx] = useState(null);
  const [image, setUploadedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({ id: '', trackingId: '' });

  const dispatch = useDispatch();
  const { status, registrationMessage, error } = useSelector((state) => state.auth);
  const { departments, loading,} = useSelector((state) => state.auth);
  const { roles } = useSelector((state) => state.auth); // Get roles from state

  const phone_number = useSelector((state) => state.auth.phone_number); 
  const first_name = useSelector((state) => state.auth.first_name); 
  const last_name = useSelector((state) => state.auth.last_name); 
  const password = useSelector((state) => state.auth.password); 

  const formDataObj = {
    phone_number,
    first_name,
    last_name,
    password,
    department: selectedDepartment.trackingId, // Use trackingId for department
    role,
    image,
  };
  console.log(formDataObj);

  const formData = new FormData();
  formData.append("phone_number", phone_number);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("password", password);
  formData.append("department", selectedDepartment.trackingId);
  formData.append("role", role);
  formData.append("image", image);
  
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error.error);
      console.log(error.error) // Display the error from the state in the snackbar
      setOpenSnackbar(true);
    }
  }, [error]);
  const handleContinue = async (e) => {
    e.preventDefault();
    setIsLoadingRegister(true);
    
    try {
      // Simulate an async action or actual dispatch
      await dispatch(userDetails({ formData, navigate }));
    } catch (error) {
      // Catch errors from the dispatch and display a relevant message in the snackbar
      setOpenSnackbar(true);
    } finally {
      setIsLoadingRegister(false); // Reset loading when done
    }
  };
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true); 

      setUploadedImgx(file);
      setUploadedImg(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (result && typeof result === "string") {
          setPreviewUrl(result);
        } else {
          console.error("Invalid image data URL");
          setPreviewUrl(null);
        }
        setIsLoading(false); 
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect to handle global errors

  // Handle department selection and trigger roles fetching
  const handleDepartmentChange = (event) => {
    const selectedDept = departments.find(dept => dept.trackingId === event.target.value);
    if (selectedDept) {
      setSelectedDepartment({
        id: selectedDept._id, // Use _id to fetch roles
        trackingId: selectedDept.trackingId // Use trackingId for form submission
      });
      dispatch(fetchRoles(selectedDept._id)); // Fetch roles using _id
    }
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
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontFamily: "Poppins", fontWeight: "bold" }}
          >
            Register Now
          </Typography>

          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              marginBottom: 2,
            }}
          >
            {isLoading ? (
  <div style={{ width: "150px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <span>Loading...</span>
  </div>
) : previewUrl ? (
  <img
    src={previewUrl}
    alt="User Avatar"
    style={{ width: "150px", height: "150px",outline:"1px solid blue", borderRadius: "50%" }}
  />
) : (
  <img
    alt="User Avatar"
    src={Avatar}
    style={{ width: "150px", height: "150px",outline:"1px solid blue", borderRadius: "50%" }}
  />
)}
            <input
              accept=".png, .jpg, .jpeg"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="icon-button-file">
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
            </label>
          </Box>
          <Box disableGutters>
            <FormControl
              margin="normal"
              sx={{ width: "486px", fontFamily: "Poppins" }}
            >
              <InputLabel id="department-label" sx={{ fontFamily: "Poppins" }}>
                Select Department
              </InputLabel>
              <Select
                labelId="department-label"
                value={selectedDepartment.trackingId}
                onChange={handleDepartmentChange}
                label="Department"
                sx={{
                  backgroundColor: "#F7F7FC",
                  border: "none",
                  outline: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the outline
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the outline on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the outline when focused
                  },
                }}
              >
           
                {departments.map((dept) => (
        <MenuItem key={dept.trackingId} value={dept.trackingId}>
          {dept.name}
        </MenuItem>
      ))}
              </Select>
            </FormControl>
          </Box>
          <Box disableGutters>
            <FormControl
              disableGutters
              // variant="filled"
              margin="normal"
              sx={{ width: "486px" }}
            >
              <InputLabel sx={{ fontFamily: "Poppins" }} id="role-label">
                Select Role
              </InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={handleRoleChange}
                label="Role"
                sx={{
                  backgroundColor: "#F7F7FC",
                  border: "none",
                  outline: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the outline
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the outline on hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the outline when focused
                  },
                }}
              >

{roles.map((role)=>(
  <MenuItem key={role.trackingId} value={role.trackingId}>
    {role.name}
  </MenuItem>
 
))}
              </Select>
            </FormControl>
          </Box>
          <Button
  variant="contained"
  sx={{
    mt: 2,
    backgroundColor: "#1F487C",
    borderRadius: "50px",
    width: "327px",
    textTransform: "capitalize",
    boxShadow: "none",
    height: "52px",
    "&:hover": {
      backgroundColor: "#1F487C",
    },
  }}
  onClick={handleContinue}
  disabled={isLoadingRegister}  // Disable button during loading
>
  {isLoadingRegister ? "Loading..." : "Save"}  {/* Change text to 'Loading...' */}
</Button>
        </Box>
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

export default RoleSelect;

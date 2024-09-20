import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Snackbar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Container,
  Box,
  Button,
  InputAdornment,Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupContactItem from "./GroupContactItem";
import SelectedContacts from "./CreateGroupSelectedContacts";
import { Search } from "@mui/icons-material";
import {
  GetUsers,
  SendReceiverId,
  setSelectedContact,
  GetAllChats,
  CreateUsersGroup,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GroupAvatar from "../assets/DefaultGroupImage.png";


const CreateGroup = ({onClose}) => {
  const dispatch = useDispatch();


  const handleClear = () => {
    setSearchQuery(""); // Clear the input field
  };
  const users = useSelector((state) => state.auth.users);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [GroupName, setGroupName] = useState("");
  const [GroupNameError, setGroupNameError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [imagex, setUploadedImgx] = useState(null);
  const [image, setUploadedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const[placeholderimgstring, setPlaceholderimgstring] = useState("THIS IS A PLACEHOLDER FOR GROUP IMAGE");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");  // Snackbar severity
  const isFirstRender = useRef(true); // Track the first render

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
  const handleValidation = () => {
    if (GroupName.trim() === "") {
      setGroupNameError(true); // Trigger error if empty
    } else {
      setGroupNameError(false); // Reset error if valid
      setCurrentStep(2);
      // Proceed to next step if valid
      // You can proceed with form submission or next steps
    }
  };
  const handleSelectContact = (contact) => {
    setSelectedContacts((prevSelected) => {
      if (prevSelected.some((c) => c._id === contact._id)) {
        // If contact is already selected, remove it
        return prevSelected.filter((c) => c._id !== contact._id);
      } else {
        // Otherwise, add it to the selected contacts
        return [...prevSelected, contact];
      }
    });
  };
  const handleDeselect = (contactId) => {
    setSelectedContacts((prevContacts) =>
      prevContacts.filter((contact) => contact._id !== contactId)
    );
  };

  const filteredUsers = users?.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleGoBack = () => {
    setCurrentStep(1);
  };


  const handleCreate = () => {
    const formData = new FormData();
    formData.append("groupName", GroupName);
    formData.append("groupImage", image);
  
    // Create an array of participant IDs
    const participantIds = selectedContacts.map(contact => contact._id);
    
    // Append participants array as JSON string
    formData.append('participants', JSON.stringify(participantIds));
  
    dispatch(CreateUsersGroup({
      token: localStorage.getItem("token"),
      formData
    }))
    .unwrap()  // Wait for CreateUsersGroup to be fulfilled
    .then(() => {
      // Show success message
      setSnackbarMessage("Group chat created successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
  
      // Dispatch GetAllChats and return the promise
      return dispatch(GetAllChats({ token: localStorage.getItem("token") }));
    })
    .then(() => {
      // After GetAllChats is fulfilled, trigger onClose
      onClose();
    })
    .catch(error => {
      // Handle error case
      setSnackbarMessage("Failed to create group chat. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    });
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Container disableGutters>
      <AppBar position="static" disableGutters sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ backgroundColor: "#0BC827" }}>
          <IconButton onClick={currentStep === 1 ? onClose : handleGoBack}>
            <ArrowBackIosIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" sx={{ fontFamily: "Poppins", flexGrow: 1 }}>
            {currentStep === 1 ? "New Group" : "Add Members"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        {currentStep === 1 && (
          <>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                marginBottom: 2,
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>Loading...</span>
                </div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="User Avatar"
                  style={{
                    width: "150px",
                    height: "150px",
                    outline: "1px solid blue",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  alt="User Avatar"
                  src={GroupAvatar}
                  style={{
                    width: "150px",
                    height: "150px",
                    outline: "1px solid blue",
                    borderRadius: "50%",
                  }}
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
            {/* Grouping Typography and TextField in a Box to control alignment */}
            <Box sx={{ width: "90%", marginBottom: "20px" }}>
              <Typography
                align="left"
                sx={{ fontFamily: "Poppins", marginBottom: "8px" }}
              >
                Group Name
              </Typography>

              <TextField
                label="Group Name"
                margin="none"
                variant="filled"
                required
                InputProps={{
                  disableUnderline: true,
                }}
                value={GroupName}
                onChange={(e) => setGroupName(e.target.value.trim())}
                error={GroupNameError} // Show error state
                helperText={GroupNameError ? "Group Name is required" : ""} // Display helper text
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
                    display: "none",
                  },
                  borderRadius: "4px",
                  width: "100%",
                  fontFamily: "Poppins",
                }}
              />
            </Box>

            <br />
            <Button
              sx={{
                padding: "8px",
                color: "white",
                width: "50%",
                fontSize: "20px",
                borderRadius: "10px",
                backgroundColor: "#0BC827",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#0BC827",
                },
              }}
              onClick={handleValidation}
            >
              Next
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Box sx={{ width: "100%", position: "relative" }}>
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Search"
                    variant="filled"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      disableUnderline: true, // Removes the underline
                      startAdornment: (
                        <InputAdornment position="start" sx={{ padding: 0 }}>
                          <SearchIcon
                            sx={{ color: "#ADB5BD", marginBottom: 2 }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end" sx={{ padding: 0 }}>
                          {searchQuery && (
                            <IconButton onClick={handleClear} edge="end">
                              <ClearIcon sx={{ color: "#ADB5BD" }} />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: "90%",
                      margin: "auto",
                      ".MuiFilledInput-root": {
                        paddingTop: 1, // Adjust padding above the input
                        paddingBottom: 1,
                        backgroundColor: "#F7F7FC",
                        borderRadius: "10px", // Add borderRadius to round the corners
                      },
                      ".MuiFilledInput-input": {
                        paddingTop: 0, // Adjust padding above the placeholder
                        paddingBottom: 0,
                      },
                    }}
                  />
                </Box>
                <SelectedContacts
                  contacts={selectedContacts}
                  onDeselect={handleDeselect}
                />
              </>
              {status === "loading" && <p>Loading...</p>}
              {status === "failed" && <p>Error: {error?.message}</p>}
              <Box
                sx={{
                  flexGrow: 1, // Allow the list to take up remaining space
                  overflowY: "auto", // Enable scrolling when content overflows
                  maxHeight: "50vh", // Set the fixed height for the list
                  border: "1px solid #ddd", // Optional: border for the list
                  padding: "8px", // Optional: padding for the list
                  marginTop: "30px",
                }}
              >
                {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                  <List>
                    {filteredUsers.map((user) => (
                      <GroupContactItem
                        key={user._id}
                        contact={user}
                        isSelected={selectedContacts.some(
                          (c) => c._id === user._id
                        )}
                        onSelect={handleSelectContact}
                      />
                    ))}
                  </List>
                ) : (
                  <Typography>No contacts found</Typography>
                )}
              </Box>
              <Button
                sx={{
                  padding: "8px",
                  color: "white",
                  width: "50%",
                  fontSize: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#0BC827",
                  left: "25%",
                  bottom: 0,
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#0BC827",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#A9A9A9", // Gray background when disabled
                    // color: "#FFFFFF", // White text when disabled
                  },
                }}
                onClick={handleCreate}
                disabled={selectedContacts.length < 2} // Disable if less than 2 contacts
              >
                Create
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Snackbar
      open={openSnackbar}
      autoHideDuration={11000}
      onClose={() => setOpenSnackbar(false)}
      >
      <Alert 
      severity={snackbarSeverity}
      onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Container>
  );
};

export default CreateGroup;

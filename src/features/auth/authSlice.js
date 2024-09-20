import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  phone_number: "",
  registrationMessage: null,
  error: null,
  first_name: null,
  last_name: null,
  password: null,
  role: null,
  department: [],
  image: null,
  step: "register",
  token: null,
  users: [],
  chatList: [],
  participantId: null,
  allUsers: [],
  conversation_id: null,
  content: null,
  user_id: null,
  sender_ids: [],
  departments:[],
  name: null,
  roles:[],
  isAuthenticated: false,
  selectedContact: null,
  setSelectedContact:null,
  logId:null
};
const baseUrl = process.env.BASE_URL
export const ReceiveMessages = createAsyncThunk(
  "auth/ReceiveMessages",
  async (_, { getState, rejectWithValue }) => {
    try {
      const conversation_id = localStorage.getItem("conversation_id");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/api/messages/${conversation_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // This should include an array of messages with a sender property
    } catch (error) {
      // console.error(
      //   "Error fetching messages:",
      //   error.response ? error.response.data : error.message
      // );
      return rejectWithValue(
        error.response ? error.response.data : "Error fetching messages"
      );
    }
  }
);
export const fetchDepartments = createAsyncThunk(
  'auth/departments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/departments');
      const data = await response.json();

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }

      return data; // Return the departments data
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors
    }
  }
);
export const fetchRoles = createAsyncThunk(
  'auth/fetchRoles',
  async (departmentUuid, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/roles/${departmentUuid}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch roles');
      }

      return data; // Return the roles
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const SendMessage = createAsyncThunk(
  "auth/SendMessage",
  async ({ token, conversation_id, message }, { rejectWithValue }) => {
    try {
      // alert(localStorage.getItem("token"))
      const response = await axios.post(
        "http://localhost:4000/api/messages",
        {
          token: token,
          conversationId: conversation_id,
          content: message, // Sending the message as content
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("hello1");
      return response.data; // Return the API response data
    } catch (error) {
      // console.log(error);
      // console.log("hello2");
      // Handle the error and return the rejection value
      return rejectWithValue(error.response.data || "Error sending message");
    }
  }
);

export const SendReceiverId = createAsyncThunk(
  "auth/SendReceiverId",
  async ({ token, participantId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/conversations",
        { participantId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // This response contains the _id you need
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const CreateUsersGroup = createAsyncThunk(
  "auth/CreateUsersGroup", // Action type
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      // Make the POST request with the passed FormData
      const response = await axios.post(
        "http://localhost:4000/api/group-conversation", // API endpoint for creating a group
        formData, // Directly pass FormData here
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token authorization
            // 'Content-Type': 'multipart/form-data' // This header is automatically set by axios for FormData
          },
        }
      );

      return response.data; // Return the response data if the request is successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle any errors
    }
  }
);
// export const GetAllChats = createAsyncThunk(
//   "auth/GetAllChats",
//   async ({ resthandler, token }, { rejectWithValue }) => {
//     try {
//       console.log("Attempting to fetch all chats with token:", token);
//       const response = await axios.get("http://localhost:4000/api/all-chats", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("API response:", response.data);
//       resthandler(distpatch(user));
//       return response.data;
//     } catch (error) {
//       console.error("API request failed:", error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

export const GetAllChats = createAsyncThunk(
  "auth/GetAllChats",
  async ({ resthandler, token }, { dispatch, rejectWithValue }) => {
    try {
      // console.log("Attempting to fetch all chats with token:", token);
      const response = await axios.get("http://localhost:4000/api/all-chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("API response:", response.data);

      // If the response data is valid and you want to re-dispatch
      if (response.data && typeof resthandler === "function") {
        resthandler(response.status);
      }

      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const GetUsers = createAsyncThunk(
  "auth/GetUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      console.log("IM CHEKING HERE",response.data)
      return response.data ;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const passwordcheck = createAsyncThunk(
  "auth/passwordcheck",
  async ({ phone_number, password }, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { phone_number, password }
      );
      console.log(response.data); // Log the response data
      if (response.data.logId) {
        dispatch(saveLogId(response.data.logId));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (phone_number, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/validate-at-login",
        { phone_number }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (logId, { dispatch, rejectWithValue, getState }) => {
    try {
      // Get the token from the Redux state (or local storage, wherever it's stored)
      const token = getState().auth.token;

      const response = await axios.post(
        "http://localhost:4000/api/auth/logout",
        { logId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Return the response data first
      const responseData = response.data;

      // Dispatch the logout after the response is returned
      dispatch(logout());

      return responseData; // Return the response data after dispatching logout
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed"); // Handle errors
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (phone_number, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/validate-at-register",
        { phone_number }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userDetails = createAsyncThunk(
  "auth/userDetails",
  async ({ formData, navigate }, { rejectWithValue }) => {
    // const {phone_number, first_name, last_name, password, department, role, image} = formDataObj
    // console.log(formDataObj)
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

        }
      );
      navigate('/Login')

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    
    saveLogId:(state,action)=>{
      state.logId = action.payload;
    },
    addToChatList: (state, action) => {
      if (!state.chatList.some((user) => user.name === action.payload.name)) {
        state.chatList.push(action.payload);
      }
    },
    save_info(state, action) {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.password = action.payload.password;
    },
    setStep(state, action) {
      state.isAuthenticated = true;

      state.status = "succeeded";

      state.step = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phone_number = action.payload;
    },
    setSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },
    updateLastMessage: (state, action) => {
      const { conversationId, message,timestamp } = action.payload;

      // Find the user with the matching conversationId and update their lastMessage
      const user = state.allUsers.find((user) => user._id === conversationId);
      if (user) {
        user.lastMessage = message;
        user.timestamp = timestamp;
      }
    },
    // SetparticipantId(state, action) {
    //   state.participantId = action.payload;
    //   console.log("The participant id is" + state.participantId)
    // },
    setConversationId(state, action) {
      state.conversation_id = null;
      console.log(
        "The state of my conversation id before is" + state.conversation_id
      );
      state.conversation_id = action.payload;
      console.log(
        "The state of my conversation id after is" + state.conversation_id
      );
      localStorage.setItem("conversation_id", state.conversation_id);
    },
    SetUserId(state, action) {
      state.user_id = action.payload;
      // console.log("The participant id is" + state.participantId)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.selectedContact = null;
      localStorage.clear();
      // Optionally clear local storage or other state management
    },
  },
  extraReducers: (builder) => {
    builder

    .addCase(fetchRoles.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    })
    .addCase(fetchRoles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // assuming the response has a user object
        // Optionally save authentication state or token to localStorage
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload; // assuming error message is passed here
      })
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(login.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.isAuthenticated = true;
      //   state.user = action.payload.user; // assuming the response has a user object
      //   // Optionally save authentication state or token to localStorage
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload; // assuming error message is passed here
      // });
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registrationMessage = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registrationMessage = action.payload.message;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(passwordcheck.pending, (state) => {
        state.status = "loading";
      })
      .addCase(passwordcheck.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user_id = action.payload.user._id;
        state.user = action.payload;
        state.registrationMessage = action.payload.message;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user_id", action.payload.user._id);
        console.log("Token stored in state:", state.token);
        console.log("User_id stored in state:", state.user_id);
        console.log("The username is" + state.first_name);
        localStorage.setItem("username", action.payload.user.name);
      })
      .addCase(passwordcheck.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(GetUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(GetUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(SendReceiverId.pending, (state) => {
        state.status = "loading";
      })

      .addCase(SendReceiverId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversation_id = action.payload._id; // Save the conversation _id in state
        localStorage.setItem("conversation_id", state.conversation_id); // Save it in localStorage
        console.log(
          "The conversation_id from SendReceiverId:",
          state.conversation_id
        );
      })
      .addCase(SendReceiverId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Pending case
      .addCase(CreateUsersGroup.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset any previous errors
      })
      // Fulfilled case
      .addCase(CreateUsersGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.group = action.payload; // Save the created group details
        state.error = null; // Clear any previous errors
      })
      // Rejected case
      .addCase(CreateUsersGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create group'; // Store the error message
      })
      .addCase(GetAllChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = action.payload;
        // localStorage.setItem("AllUsers", JSON.stringify(action.payload));
      })
      .addCase(GetAllChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("GetAllChats failed:", action.payload);
      })
      .addCase(ReceiveMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(ReceiveMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Extract sender IDs from the messages and store them
        const sender_ids = action.payload.map((message) => message.sender);
        state.sender_ids = [...new Set(sender_ids)]; // Store unique sender IDs
        localStorage.setItem("sender_ids", state.sender_ids);
        localStorage.setItem("revmsg", JSON.stringify(state.messages));
        state.messages = JSON.stringify(action.payload);

        console.log("sender_ids" + state.sender_ids);
      })
      .addCase(ReceiveMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  logout,
  save_info,
  setStep,
  setPhoneNumber,
  addToChatList,
  setConversationId,
  SetUserId,
  setSelectedContact,
  updateLastMessage,
  saveLogId
} = authSlice.actions;

export default authSlice.reducer;

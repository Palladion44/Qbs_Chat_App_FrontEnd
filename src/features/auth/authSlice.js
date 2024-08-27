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
  department: null,
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
  name: null,
  isAuthenticated: false,
};

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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const passwordcheck = createAsyncThunk(
  "auth/passwordcheck",
  async ({ phone_number, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { phone_number, password }
      );

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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
  async (
    { phone_number, first_name, last_name, password, department, role, image },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          phone_number,
          first_name,
          last_name,
          password,
          department,
          role,
          image,
        }
      );

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
      state.user = null;
      // localStorage.clear();
      // Optionally clear local storage or other state management
    },
  },
  extraReducers: (builder) => {
    builder

      // .addCase(login.pending, (state) => {

      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.user = action.payload;
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
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
} = authSlice.actions;

export default authSlice.reducer;

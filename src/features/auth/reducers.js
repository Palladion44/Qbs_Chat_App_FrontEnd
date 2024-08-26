// import { createSlice } from '@reduxjs/toolkit';
// import {
//   ReceiveMessages,
//   SendMessage,
//   SendReceiverId,
//   GetAllChats,
//   GetUsers,
//   passwordcheck,
//   login,
//   register,
//   userDetails,
// } from '../auth/actions';

// const initialState = {
//   user: null,
//   status: 'idle',
//   phone_number: '',
//   registrationMessage: null,
//   error: null,
//   first_name: null,
//   last_name: null,
//   password: null,
//   role: null,
//   department: null,
//   image: null,
//   step: 'register',
//   token: null, 
//   users: [], 
//   chatList: [],  
//   participantId: null,
//   allUsers: [], 
//   conversation_id: null,
//   content: null,
//   user_id: null,
//   sender_ids: [],
//   name: null,
// };

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     logout(state) {
// //       state.user = null;
// //     },
// //     // addToChatList: (state, action) => {
// //     //   if (!state.chatList.some(user => user.name === action.payload.name)) {
// //     //     state.chatList.push(action.payload);
// //     //   }
// //     // },
// //     save_info(state, action) {
// //       state.first_name = action.payload.first_name;
// //       state.last_name = action.payload.last_name;
// //       state.password = action.payload.password;
// //     },
// //     setStep(state, action) {
// //       state.step = action.payload;
// //     },
// //     setPhoneNumber(state, action) {
// //       state.phone_number = action.payload;
// //     },
// //     setConversationId(state, action) {
// //       state.conversation_id = action.payload;
// //       localStorage.setItem('conversation_id', state.conversation_id);
// //     },
// //     SetUserId(state, action) {
// //       state.user_id = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(login.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(login.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.user = action.payload;
// //       })
// //       .addCase(login.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })
// //       // Add cases for other async actions (thunks)
// //       .addCase(ReceiveMessages.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.messages = action.payload;
// //         const sender_ids = action.payload.map(message => message.sender);
// //         state.sender_ids = [...new Set(sender_ids)];
// //         localStorage.setItem('sender_ids', state.sender_ids);
// //       })
// //       .addCase(ReceiveMessages.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       })

// //   }
// // });
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       state.user = null;
//     },
//     addToChatList: (state, action) => {
//       if (!state.chatList.some(user => user.name === action.payload.name)) {
//         state.chatList.push(action.payload);
//       }
//     },
//     save_info(state, action) {
//       state.first_name = action.payload.first_name;
//       state.last_name = action.payload.last_name;
//       state.password = action.payload.password;
//     },
//     setStep(state, action) {
//       state.step = action.payload;
//     },
//     setPhoneNumber(state, action) {
//       state.phone_number = action.payload;
//     },
//     // SetparticipantId(state, action) {
//     //   state.participantId = action.payload;
//     //   console.log("The participant id is" + state.participantId)
//     // },
//     setConversationId(state, action) {
//       state.conversation_id= null;
//       console.log("The state of my conversation id before is"+state.conversation_id);
//       state.conversation_id = action.payload;
//       console.log("The state of my conversation id after is"+state.conversation_id);
//       localStorage.setItem('conversation_id', state.conversation_id);

//     },
//     SetUserId(state, action) {
//       state.user_id = action.payload;
//       // console.log("The participant id is" + state.participantId)
//     },

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         console.log("The first name is"+ state.first_name)
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(register.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.registrationMessage = action.payload.message;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(userDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(userDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.registrationMessage = action.payload.message;
//       })
//       .addCase(userDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(passwordcheck.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(passwordcheck.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.token = action.payload.token;
//         state.user_id= action.payload.user._id;
//         state.registrationMessage = action.payload.message;
//         localStorage.setItem('token', action.payload.token);
//         localStorage.setItem('user_id',action.payload.user._id);
//         console.log("Token stored in state:", state.token);
//         console.log("User_id stored in state:", state.user_id);
//         console.log("The username is"+state.first_name);
//         localStorage.setItem('username',action.payload.user.name);
//       })
//       .addCase(passwordcheck.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(GetUsers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(GetUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.users = action.payload;
//       })
//       .addCase(GetUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(SendReceiverId.pending, (state) => {
//         state.status = 'loading';
//       })
//       // .addCase(SendReceiverId.fulfilled, (state, action) => {
//       //   state.status = 'succeeded';
//       //   state.users = action.payload;
//       //   console.log('The state in the conversation_id of SendReciverId is'+ state.conversation_id);
//       //   localStorage.setItem('conversation_id',state.conversation_id);
//       // })
//       // .addCase(SendReceiverId.rejected, (state, action) => {
//       //   state.status = 'failed';
//       //   state.error = action.payload;
//       // })
//       .addCase(SendReceiverId.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.conversation_id = action.payload._id; // Save the conversation _id in state
//         localStorage.setItem('conversation_id', state.conversation_id); // Save it in localStorage
//         console.log('The conversation_id from SendReceiverId:', state.conversation_id);
//       })
//       .addCase(SendMessage.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(SendMessage.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(SendMessage.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.registrationMessage = action.payload.message;
//       })
//       .addCase(GetAllChats.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.allUsers = action.payload; 
//        localStorage.setItem('AllUsers', JSON.stringify(action.payload));
//       })
//       .addCase(GetAllChats.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//         console.error("GetAllChats failed:", action.payload);
//       })
//       .addCase(ReceiveMessages.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(ReceiveMessages.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.messages = action.payload;
//         // Extract sender IDs from the messages and store them
//         const sender_ids = action.payload.map(message => message.sender);
//         state.sender_ids = [...new Set(sender_ids)]; // Store unique sender IDs
//         localStorage.setItem('sender_ids', state.sender_ids);
//         console.log('sender_ids'+ state.sender_ids);
//       })
//       .addCase(ReceiveMessages.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   }
// });
// export const { logout, save_info, setStep, setPhoneNumber, addToChatList, setConversationId, SetUserId } = authSlice.actions;
// export default authSlice.reducer;

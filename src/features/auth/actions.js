// // src/redux/auth/actions.js
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const ReceiveMessages = createAsyncThunk(
//   'auth/ReceiveMessages',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const conversation_id = localStorage.getItem("conversation_id");
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`http://localhost:4000/api/messages/${conversation_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, 
//         },
//       });   
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching messages:', error.response ? error.response.data : error.message);
//       return rejectWithValue(error.response ? error.response.data : 'Error fetching messages');
//     }
//   }
// );

// export const SendMessage = createAsyncThunk(
//   'auth/SendMessage',
//   async ({ token,conversation_id, message }, { rejectWithValue }) => {
//     try {
//       // alert(localStorage.getItem("token"))
//       const response = await axios.post(
//         'http://localhost:4000/api/messages', 
//         {
//           token: token,
//           conversationId: conversation_id,
//           content: message // Sending the message as content
//         }, 
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );
//       console.log("hello1");
//       return response.data; // Return the API response data
//     } catch (error) {
//       console.log(error);
//       console.log("hello2");
//       // Handle the error and return the rejection value
//       return rejectWithValue(error.response.data || 'Error sending message');
//     }
//   }
// );

 


// // export const SendReceiverId = createAsyncThunk(
// //   'auth/SendReceiverId',
// //   async ({ token, participantId }, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:4000/api/conversations', 
// //         { participantId }, 
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );
// //       // localStorage.setItem('conversation_id',response.data._id);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// export const SendReceiverId = createAsyncThunk(
//   'auth/SendReceiverId',
//   async ({ token, participantId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:4000/api/conversations', 
//         { participantId }, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       return response.data; // This response contains the _id you need
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const GetAllChats = createAsyncThunk(
//   'auth/GetAllChats',
//   async ({ token }, { rejectWithValue }) => {
//     try {
//       console.log('Attempting to fetch all chats with token:', token);
//       const response = await axios.get(
//         'http://localhost:4000/api/all-chats', 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       console.log('API response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('API request failed:', error);
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );



// export const GetUsers = createAsyncThunk(
//   'auth/GetUsers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/users');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );





// export const passwordcheck = createAsyncThunk(
//   'auth/passwordcheck',
//   async ({ phone_number, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/login', { phone_number, password });
  
//       if(response.status){
//       }
//       return response.data;

//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (phone_number, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/validate-at-login', { phone_number });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const register = createAsyncThunk(
//   'auth/register',
//   async (phone_number, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/validate-at-register', { phone_number });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const userDetails = createAsyncThunk(
//   'auth/userDetails',
//   async ({ phone_number, first_name, last_name, password, department, role, image }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/register', { phone_number, first_name, last_name, password, department, role, image });
      
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


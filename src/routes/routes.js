import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthRoutes from './AuthRoutes/AuthRoutes';
import UnAuthRoutes from './UnAuthRoutes/UnAuthRoutes';
import { useSelector } from "react-redux";

const AppRoutes = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
          {isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}
        </>
    )
}

// // export default AppRoutes
// import React, { useState } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AuthRoutes from "./AuthRoutes/AuthRoutes";
// import UnAuthRoutes from "./UnAuthRoutes/UnAuthRoutes";
// import HomePage from "../components/HomePage";
// import Register from "../components/Register";
// import ProfileAccount from "../components/ProfileAccount";
// import RoleSelect from "../components/RoleSelect";
// import { Login } from "@mui/icons-material";
// import PasswordAuthenticate from "../components/PasswordAuthenticate";
// import AllChats from "../components/AllChats";
// import PersonalChat from "../components/PersonalChat";
// import UserProfile from "../components/UserProfile";
// import ContactsPage from "../components/ContactsPage";

// const AppRoutes = () => {
//   const [authuserdetail, setauthuserdetail] = useState(true);

//   return (
//     // <Router>
//     //     {console.log("The details are"+authuserdetail)}
//     //   {authuserdetail ? <UnAuthRoutes /> : <AuthRoutes />}
//     // </Router>
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/Register" element={<Register />} />
//         <Route path="/profile" element={<ProfileAccount />} />
//         <Route path="/RoleSelect" element={<RoleSelect />} />
//         <Route path="/Login" element={<Login />} />
//         <Route
//           path="/PasswordAuthenticate"
//           element={<PasswordAuthenticate />}
//         />
//         <Route path="/AllChats" element={<AllChats />} />
//         <Route path="/personal-chat/:name" element={<PersonalChat />} />
//         <Route path="/UserProfile" element={<UserProfile />} />
//         <Route path="/ContactsPage" element={<ContactsPage />} />
//       </Routes>
//     </Router>
//   );
// };


export default AppRoutes;
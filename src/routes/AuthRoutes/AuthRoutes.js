

import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PersonalChat from "../../components/PersonalChat";
import UserProfile from "../../components/UserProfile";
import ContactsPage from "../../components/ContactsPage";
import AllChats from "../../components/AllChats";

function AuthRouth() {

  return (
    <>   
     <Router>
      <Routes>
      <Route
        path="/AllChats"
        element={<AllChats/>}
      />
      <Route
        path="/personal-chat/:name"
        element={<PersonalChat /> }
      />
      <Route
        path="/UserProfile"
        element={<UserProfile /> }
      />
      <Route
        path="/ContactsPage"
        element={ <ContactsPage /> }
      />
        
        
        
        </Routes>
    </Router>
    </>

  );
}

export default AuthRouth;

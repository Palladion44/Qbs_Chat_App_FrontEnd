

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../components/HomePage";
import Register from "../../components/Register";
import Login from "../../components/Login";
import ProfileAccount from "../../components/ProfileAccount";
import RoleSelect from "../../components/RoleSelect";
import PasswordAuthenticate from "../../components/PasswordAuthenticate";

function UnauthRouth() {
  return (
    <>   
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<ProfileAccount />} />
        <Route path="/RoleSelect" element={<RoleSelect />} />
        <Route path="/PasswordAuthenticate" element={<PasswordAuthenticate />} />

      </Routes>
    </Router>
    </>

  );
}

export default UnauthRouth;

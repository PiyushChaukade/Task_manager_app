import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const Logout = () => {
const navigate=useNavigate()

  const Logout = () => {
  

        localStorage.clear();
        navigate("/login")
      
  };

 
  return (
    <>
    <Button onClick={Logout}>Logout</Button>
    </>
  );
};

export default Logout;

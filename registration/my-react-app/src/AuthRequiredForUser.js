import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRequiredForUser() {
  console.log("rendering");
  const token = localStorage.getItem('token');
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    if (!token) {
      setFlag(false); // No token, set flag to false
    } else {
      console.log("before post request")
      axios
        .post('http://localhost:8000/api/tokenVerification', {type:"user"}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.data === 'ok') {
            console.log("responded");
            setFlag(true); // User is authenticated
          } else {
            console.log("responded1");
            localStorage.removeItem('token');
            localStorage.removeItem('type');
            setFlag(false); // Token verification failed
          }
        })
        .catch(error => {
          console.error('Token verification error:', error);
          setFlag(false); // Error in token verification
        });
    }
  }, [token]);

  if (flag === null) {
    console.log("flag is still null");
    // Waiting for the asynchronous call to complete
    return null;
    console.log("i will naot be seen")
  }
  console.log("before navigation");
  return flag ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRequiredForUser;

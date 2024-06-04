import React, { useEffect } from "react";
import {
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  RESPONSE_TYPE,
  SCOPES,
} from "../config/spotifyConfig";
import AuthButton from "../styles/AuthButton";

const Auth = ({ setToken }) => {
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const parsedHash = hash
        .substring(1)
        .split("&")
        .reduce((res, item) => {
          const parts = item.split("=");
          res[parts[0]] = parts[1];
          return res;
        }, {});

      token = parsedHash.access_token;

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    } else {
      setToken(token);
    }
  }, [setToken]);

  const handleAuthButtonClick = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      {!window.localStorage.getItem("token") ? (
        <AuthButton onClick={handleAuthButtonClick}>Login</AuthButton>
      ) : (
        <AuthButton onClick={logout}>Logout</AuthButton>
      )}
    </div>
  );
};

export default Auth;
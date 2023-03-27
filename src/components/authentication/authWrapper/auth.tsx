import React, { useState } from "react";
import Login from "../login/login";
import Signup from "../sign up/signup";
import { authStateContext } from "../../../App";
import { useContext } from "react";

export default function Auth() {
  const { authState, setAuthState } = useContext(authStateContext);
  return (
    <>
      {authState == "login" ? (
        //  @ts-ignore
        <Login />
      ) : (
        //  @ts-ignore
        <Signup />
      )}
    </>
  );
}

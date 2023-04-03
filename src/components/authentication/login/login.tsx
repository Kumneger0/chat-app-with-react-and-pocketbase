import React, { useContext, useRef } from "react";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import { pb } from "../../../App";

import { authStateContext } from "../../../App";

export default function Login() {
  const { setAuthState } = useContext(authStateContext);
  const userRef = useRef<any>();
  const passRef = useRef<any>();

  const login = async () => {
    // @ts-ignore
    const { value: usernameOrEmail } = userRef.current;
    const { value: password } = passRef.current;
    if (!usernameOrEmail || !password) return;
    try {
      await pb.collection("users").authWithPassword(usernameOrEmail, password);
    } catch (err) {
      alert("the was an err ");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.WellcomeMessage}>
        <h2>Wellcome Back</h2>
        <span>sign in to continue</span>
      </div>
      <div className={styles.userName}>
        <label htmlFor="user">username or email</label>
        <input
          className={styles.inputField}
          ref={userRef}
          placeholder="email or username"
          type="text"
          name=""
          id="user"
        />
      </div>
      <div className={styles.password}>
        <label htmlFor="pass">Password</label>
        <input
          className={styles.inputField}
          ref={passRef}
          placeholder="password"
          type="password"
          name=""
          id="pass"
        />
      </div>
      <div className={styles.Button}>
        <Button
          onClick={login}
          style={{
            background: "rgb(49, 220, 49)",
            color: "#fff",
            width: "15rem",
          }}
        >
          Log in
        </Button>
      </div>
      <hr style={{ width: "90%", margin: "0 auto" }} />
      <div className={styles.orSignIn}>
        <span>don't have an acount yet ?</span>
        <Button
          onClick={() => {
            if (!setAuthState) return;
            setAuthState("signup");
          }}
        >
          register
        </Button>
      </div>
    </div>
  );
}

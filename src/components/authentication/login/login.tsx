import React, { useRef } from "react";
import styles from "./login.module.css";
import { Button } from "@mui/material";
import { pb } from "../../../App";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();

  const login = async () => {
    // @ts-ignore
    if (!userRef.current.value || !passRef.current.value) return;
    try {
      await pb
        .collection("users")
        .authWithPassword(userRef.current.value, passRef.current.value);
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
          /* @ts-ignore */
          ref={userRef}
          placeholder="email or username"
          type="text"
          name=""
          id="user"
        />
      </div>
      <div className={styles.password}>
        <label htmlFor="pass">username or email</label>
        <input
          /* @ts-ignore */
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
          style={{ background: "rgb(49, 220, 49)", color: "#fff" }}
        >
          Log in
        </Button>
      </div>
      <hr />
      <div className={styles.orSignIn}>
        <span>don't have an acount yet ?</span>
        <Button>register</Button>
      </div>
    </div>
  );
}

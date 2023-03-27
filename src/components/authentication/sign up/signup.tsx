import { useContext, useRef } from "react";
import styles from "./signup.module.css";
import { Button } from "@mui/material";
import { pb } from "../../../App";
import { authStateContext } from "../../../App";

export default function Signup() {
  const { setAuthState } = useContext(authStateContext);
  const userRef = useRef<any>();
  const passRef = useRef<any>();
  const emailRef = useRef<any>();

  const register = async () => {
    // @ts-ignore
    if (
      !userRef.current.value ||
      !passRef.current.value ||
      !emailRef.current.value
    )
      return;
    try {
      await pb.collection("users").create({
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
        passwordConfirm: passRef.current.value,
      });
      alert("you are registered");
      await pb
        .collection("users")
        .authWithPassword(emailRef.current.value, passRef.current.value);
    } catch (err) {
      console.log(err);
      alert("the was an err ");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.WellcomeMessage}>
        <h2>Wellcome to Kune Chat</h2>
        <span>create your kune Chat account</span>
      </div>
      <div className={styles.userName}>
        <label htmlFor="user">username</label>
        <input
          /* @ts-ignore */
          ref={userRef}
          placeholder="username"
          type="text"
          name=""
          id="user"
        />
      </div>
      <div className={styles.email}>
        <label htmlFor="user">email</label>
        <input
          /* @ts-ignore */
          ref={emailRef}
          placeholder="email"
          type="email"
          name=""
          id="user"
        />
      </div>
      <div className={styles.password}>
        <label htmlFor="pass">password</label>
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
          onClick={register}
          style={{ background: "rgb(49, 220, 49)", color: "#fff" }}
        >
          egister
        </Button>
      </div>
      <hr />
      <div className={styles.orSignIn}>
        <span>already have an acount yet ?</span>
        {/* @ts-ignore */}
        <Button onClick={() => setAuthState("login")}>Login</Button>
      </div>
    </div>
  );
}

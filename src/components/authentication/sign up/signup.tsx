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
    const { value: username } = userRef.current;
    const { value: email } = emailRef.current;
    const { value: password } = passRef.current;
    if (!username || !password || !email) return;
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
          className={styles.inputField}
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
          className={styles.inputField}
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
          onClick={register}
          style={{
            background: "rgb(49, 220, 49)",
            color: "#fff",
            width: "15rem",
          }}
        >
          Register
        </Button>
      </div>
      <hr style={{ width: "90%", margin: "0 auto" }} />
      <div className={styles.orSignIn}>
        <span>already have an acount ?</span>

        <Button
          onClick={() => {
            if (!setAuthState) return;
            setAuthState("login");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

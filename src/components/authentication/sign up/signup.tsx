import { useContext, useRef, useState } from "react";
import styles from "./signup.module.css";
import { Button } from "@mui/material";
import { pb } from "../../../App";
import { authStateContext } from "../../../App";

export default function Signup() {
  const { setAuthState } = useContext(authStateContext);
  const userRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLSpanElement>(null);
  const [isLoading, setIsloading] = useState<Boolean>(false);
  const [error, setError] = useState<String | null>(null);

  const register = async () => {
    setIsloading(true);
    const { value: username } = userRef.current!;
    const { value: email } = emailRef.current!;
    const { value: password } = passRef.current!;
    if (!username || !password || !email) {
      setError("There was An Error");
      setIsloading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least eight character long");
      setIsloading(false);
      return;
    }
    try {
      let isAvailable = false;
      const allUsers = await pb.collection("users").getFullList();
      for (let users of allUsers) {
        console.log(users);
        if (users.username == username) {
          isAvailable = true;
          break;
        }
      }
      if (isAvailable) {
        setError("Username or email already taken");
        setIsloading(false);
        return;
      }
      await pb.collection("users").create({
        username,
        email,
        password,
        passwordConfirm: password,
      });
      await pb.collection("users").authWithPassword(email, password);
    } catch (err) {
      console.log(err);
      setError("something wrong");
    }
    setIsloading(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.WellcomeMessage}>
        <h2>Wellcome to Kune Chat</h2>
        <span
          ref={errRef}
          style={{
            fontSize: "small",
            fontStyle: "italic",
            color: "red",
            visibility: !error ? "hidden" : "visible",
          }}
        >
          {error}
        </span>
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
          {isLoading ? "please wait..." : "Register"}
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

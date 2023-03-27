import React from "react";
import styles from "./profile.module.css";
import { useUserStore } from "../../App";
export default function Profile() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <div className={styles.profileWrapper}>
        <div className={styles.coverImage}>
          <img
            src={
              "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }
            style={{ width: "100%", height: "100%" }}
            alt=""
          />
        </div>
        <h4>My Profile</h4>
        <div className={styles.profilePic}>
          <img
            src={`https://avatars.dicebear.com/api/initials/${user.name}.svg`}
            alt=""
          />
        </div>
        <div className={styles.nameAndInfo}>
          <div>kumneger wondimu</div>
          <div>Web developer</div>
        </div>
      </div>
    </>
  );
}

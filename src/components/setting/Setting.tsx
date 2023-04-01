import React from "react";
import styles from "./setting.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { pb, useUserStore } from "../../App";
export default function Setting() {
  const user = useUserStore((state) => state.user);

  function displayLogout() {
    pb.authStore.clear();
  }

  return (
    <>
      <div className={styles.profileWrapper}>
        <div className={styles.coverImage}>
          <img
            src={
              "https://images.pexels.com/photos/359989/pexels-photo-359989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            style={{ width: "100%", height: "100%" }}
            alt=""
          />
        </div>
        <div className={styles.setting}>
          <h4>Setting</h4>
          <span onClick={displayLogout}>
            <LogoutIcon />
          </span>
        </div>
        <div className={styles.profilePic}>
          <img
            src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
            alt=""
          />
        </div>
        <div className={styles.nameAndInfo}>
          <div>{user.name}</div>
          <div contentEditable>{user.bio || "Edit your bio"}</div>
        </div>
      </div>
    </>
  );
}

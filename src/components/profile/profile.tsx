import React from "react";
import styles from "./profile.module.css";
import { useUserStore } from "../../App";
export default function Profile() {
  const user = useUserStore((state) => state.user);
  function editBio(e: KeyboardEvent) {
    console.log(e);
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
        <h4>My Profile</h4>
        <div className={styles.profilePic}>
          <img
            src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
            alt=""
          />
        </div>
        <div className={styles.nameAndInfo}>
          <div>{user.username}</div>
          <div onChange={editBio}>
            {user.bio || "Edit your bio in settings"}
          </div>
        </div>
      </div>
    </>
  );
}

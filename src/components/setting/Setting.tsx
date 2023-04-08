import React, { useState } from "react";
import styles from "./setting.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { pb, useUserStore } from "../../App";
import EditIcon from "@mui/icons-material/Edit";
import { SearchContct } from "../contacts/Contacts";
export default function Setting() {
  const user = useUserStore((state) => state.user);
  const [shouldEditBio, setThouldEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string | null>(null);
  function displayLogout() {
    pb.authStore.clear();
  }

  async function updateBio(bio: string) {
    if (!bio) return;
    const responce = await pb.collection("users").update(user.id, {
      bio,
    });
    setThouldEditBio(!shouldEditBio);
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
          <span className={styles.logout} onClick={displayLogout}>
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
          <div>{user.username}</div>
          <div className={styles.editBio}>
            <div className={styles.userBio}>
              {!shouldEditBio ? (
                user.bio || "Edit your bio"
              ) : (
                <>
                  <SearchContct
                    placeholder="new bio and Press Enter"
                    oldBio={user.bio}
                    setBio={setBio}
                    updateBio={updateBio}
                  />
                  <button
                    onClick={() => {
                      if (bio) {
                        updateBio(bio);
                      }
                    }}
                    style={{
                      fontSize: "0.7em",
                      fontStyle: "italic",
                      border: "1px solid steelblue",
                      padding: "5px",
                      marginTop: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    update
                  </button>
                </>
              )}
            </div>
            <button
              style={{ display: shouldEditBio ? "none" : "initial" }}
              onClick={() => setThouldEditBio(!shouldEditBio)}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import styles from "./contactProfile.module.css";
import { pb } from "../../App";
import CancelIcon from "@mui/icons-material/Cancel";
import { showProfile, Contact } from "../../types";
export const ContactProfile = ({
  showProfile,
  setShowProfile,
}: {
  showProfile: showProfile;
  setShowProfile: (value: boolean) => void;
}) => {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!showProfile) return;
    const getContactDetail = async () => {
      const contactDetail = await pb.collection("users").getOne(showProfile.id);
      const usernameAndBio = {
        username: contactDetail.username,
        bio: contactDetail.bio,
      };
      setContact(usernameAndBio);
    };
    getContactDetail();
  }, []);

  if (!contact) <></>;

  return (
    <>
      <div className={styles.profileWrapper}>
        <button
          onClick={() => setShowProfile(false)}
          className={styles.btnCancel}
        >
          <CancelIcon />
        </button>
        <div className={styles.coverImage}>
          <img
            src={
              "https://images.pexels.com/photos/359989/pexels-photo-359989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            style={{ width: "100%", height: "100%" }}
            alt=""
          />
        </div>
        <h4>{`${contact?.username}'s profile`}</h4>
        <div className={styles.profilePic}>
          <img
            src={`https://avatars.dicebear.com/api/initials/${contact?.username}.svg`}
            alt=""
          />
        </div>
        <div className={styles.nameAndInfo}>
          <div>{contact?.username}</div>
          <div>
            {contact?.bio
              ? contact.bio
              : `${contact?.username} does not have bio`}
          </div>
        </div>
      </div>
    </>
  );
};

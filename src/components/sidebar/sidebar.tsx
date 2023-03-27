import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSelectedItem } from "../../App";
export default function SideBar() {
  const updateSelectedItem = useSelectedItem(
    (state: any) => state.updateSelectedItem
  );
  return (
    <div className={styles.sideBarIconsWrapper}>
      <div className={styles.icons}>
        <div>
          <button className={styles.button}>
            <ChatIcon color="success" fontSize="medium" />
          </button>
        </div>
      </div>
      <div className={`${styles.icons} ${styles.acount}`}>
        <div>
          <button
            onClick={() => updateSelectedItem("Profile")}
            className={styles.button}
          >
            <AccountCircleOutlinedIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.icons} ${styles.chat}`}>
        <div>
          {" "}
          <button
            onClick={() => updateSelectedItem("Chats")}
            className={styles.button}
          >
            <QuestionAnswerIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.icons} ${styles.contacts}`}>
        <div>
          {" "}
          <button
            onClick={() => updateSelectedItem("Contacts")}
            className={styles.button}
          >
            <PermContactCalendarIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.icons} ${styles.bookmark}`}>
        <div>
          {" "}
          <button
            onClick={() => updateSelectedItem("Bookmarks")}
            className={styles.button}
          >
            <BookmarksIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.icons} ${styles.setting}`}>
        <div>
          {" "}
          <button
            onClick={() => updateSelectedItem("Setting")}
            className={styles.button}
          >
            <SettingsIcon />
          </button>
        </div>
      </div>
      <div className={`${styles.icons} ${styles.light}`}>
        <button className={styles.button}>
          <LightModeIcon />
        </button>
      </div>
    </div>
  );
}

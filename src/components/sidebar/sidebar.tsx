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
import { useInnerWidth } from "../createContactModal/useInnerWidth";
export default function SideBar({
  setShowProfile,
}: {
  setShowProfile: (value: boolean) => void;
}) {
  const updateSelectedItem = useSelectedItem(
    (state: any) => state.updateSelectedItem
  );
  const SelectedItem = useSelectedItem((state: any) => state.selectedItem);
  const width = useInnerWidth();
  return (
    <div className={styles.sideBarIconsWrapper}>
      <div className={styles.icons}>
        <div>
          <button className={styles.button}>
            <ChatIcon color="success" fontSize="medium" />
          </button>
        </div>
      </div>
      <div
        style={{
          //@ts-ignore
          background: SelectedItem == "Profile" && "#6b6565",
          padding: "-10px",
          width: "80px",
          //@ts-ignore
          maxHeight: width <= 1000 && 50,
        }}
        className={`${styles.icons} ${styles.acount}`}
      >
        <div>
          <button
            onClick={() => {
              updateSelectedItem("Profile");
              setShowProfile(false);
            }}
            className={styles.button}
          >
            <AccountCircleOutlinedIcon />
          </button>
        </div>
      </div>
      <div
        style={{
          //@ts-ignore
          background: SelectedItem == "Chats" && "#6b6565",
          padding: "-10px",
          width: "80px",
          //@ts-ignore
          maxHeight: width <= 1000 && "50px",
        }}
        className={`${styles.icons} ${styles.chat}`}
      >
        <div>
          {" "}
          <button
            onClick={() => {
              updateSelectedItem("Chats");

              setShowProfile(false);
            }}
            className={styles.button}
          >
            <QuestionAnswerIcon />
          </button>
        </div>
      </div>
      <div
        style={{
          //@ts-ignore
          background: SelectedItem == "Contacts" && "#6b6565",
          padding: "-10px",
          width: "80px",
          //@ts-ignore
          maxHeight: width <= 1000 && "50px",
        }}
        className={`${styles.icons} ${styles.contacts}`}
      >
        <div>
          {" "}
          <button
            onClick={() => {
              updateSelectedItem("Contacts");
              setShowProfile(false);
            }}
            className={styles.button}
          >
            <PermContactCalendarIcon />
          </button>
        </div>
      </div>
      <div
        style={{
          //@ts-ignore
          background: SelectedItem == "Setting" && "#6b6565",
          padding: "-10px",
          width: "80px",
          //@ts-ignore
          maxHeight: width <= 1000 && "50px",
        }}
        className={`${styles.icons} ${styles.setting}`}
      >
        <div>
          {" "}
          <button
            onClick={() => {
              updateSelectedItem("Setting");
              setShowProfile(false);
            }}
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

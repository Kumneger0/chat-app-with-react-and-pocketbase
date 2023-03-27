import React from "react";
import styles from "./chat.module.css";

import BasicModal from "../createContactModal/Modal";

export default function Chat() {
  return (
    <>
      <div className={styles.chatHeadWrapper}>
        <h3>Chats</h3>
        <BasicModal />
      </div>
    </>
  );
}

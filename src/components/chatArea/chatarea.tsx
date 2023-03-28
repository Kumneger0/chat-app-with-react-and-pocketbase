import React from "react";
import styles from "./chararea.module.css";
import SendIcon from "@mui/icons-material/Send";

export default function Chatarea() {
  return (
    <>
      <div>
        <div className={styles.head}>
          <div className={styles.userImageAndName}>
            <img className={styles.userImage} src="" alt="" />
            <div>kumneger wondimu</div>
            <span className={styles.onlineStatus}>away</span>
          </div>
        </div>
      </div>
      <div className={styles.conversation}>
        <div className={styles.messageInfo}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={`${styles.messageInfo} ${styles.you}`}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={styles.messageInfo}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={`${styles.messageInfo} ${styles.you}`}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={styles.messageInfo}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={`${styles.messageInfo} ${styles.you}`}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={styles.messageInfo}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
        <div className={`${styles.messageInfo} ${styles.you}`}>
          <div className={styles.picAndText}>
            <div className={styles.pic}>
              <img className={styles.sender} src="" alt="" />
            </div>
            <div className={styles.mesgText}>hello</div>
          </div>
          <div className={styles.dateInfo}>
            <span>kumneger</span>
            <span> date</span>
          </div>
        </div>
      </div>
      <div className={styles.messageInput}>
        <input placeholder="Type your message here" type="text" />
        <div className={styles.sendIcon}>
          <SendIcon />{" "}
        </div>
      </div>
    </>
  );
}

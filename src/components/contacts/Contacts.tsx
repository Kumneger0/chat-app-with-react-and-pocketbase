import React, { useEffect, useRef, useState } from "react";
import styles from "./contact.module.css";
import BasicModal from "../createContactModal/Modal";
import { pb } from "../../App";
import { useUserStore } from "../../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Contacts() {
  const user = useUserStore((state) => state.user);
  const searchRef = useRef();
  const contactActionRef = useRef();
  const [contacts, setContacts] = useState<any[] | any>([]);

  useEffect(() => {
    const getContacts = async () => {
      const record = await pb.collection("users").getOne(user.id, {
        expand: "contacts",
      });

      setContacts(record.expand.contacts);
    };
    getContacts();
  }, []);

  function contactAction(indx: number) {}

  return (
    <>
      <div className={styles.contactPageWrapper}>
        <div className={styles.contactWrapper}>
          <h3>Contacts</h3>
          <div className={styles.addContact}>
            <BasicModal />
          </div>
        </div>
        <div className={styles.searchField}>
          <input
            /* @ts-ignore */
            ref={searchRef}
            placeholder="Search contact"
            type="text"
            name=""
            id="user"
          />
        </div>
        <div className={styles.contactList}>
          {contacts.length ? (
            <>
              {contacts.map((contact: any, i: number) => (
                <div className={styles.eachContact}>
                  <img
                    className={styles.eachContactIcon}
                    src={`https://avatars.dicebear.com/api/initials/${contact.name}.svg`}
                    alt=""
                  />
                  <div key={contact}>{contact.name}</div>
                  <div className={styles.contactAction}>
                    <div>
                      <span>block</span>
                      <span></span>
                    </div>
                    <div>
                      <span>delete</span>
                      <span></span>
                    </div>
                  </div>
                  <span
                    className={styles.icon}
                    onClick={() => contactAction(i)}
                  >
                    <MoreVertIcon />
                  </span>
                </div>
              ))}{" "}
            </>
          ) : (
            <>
              <div>no contacts available</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

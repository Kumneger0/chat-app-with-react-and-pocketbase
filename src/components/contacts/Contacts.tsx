import React, { useEffect, useRef, useState } from "react";
import styles from "./contact.module.css";
import BasicModal from "../createContactModal/Modal";
import { pb } from "../../App";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useUserStore } from "../../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import BlockIcon from "@mui/icons-material/Block";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Contacts() {
  const user = useUserStore((state) => state.user);
  const searchRef = useRef();
  const contactActionRef = useRef<any[]>([]);

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

  function contactAction(indx: number, action: string | undefined) {
    if (action) {
      contactActionRef.current[indx].current.style.display = "none";
      return;
    }
    contactActionRef.current[indx].current.style.display = "flex";
  }

  if (contacts?.length >= 1) {
    contactActionRef.current = contacts.map(
      (contact: any, i: number) =>
        (contactActionRef.current[i] = React.createRef())
    );
  }

  async function deleteContact(indx: number) {
    const id: string = contacts[indx].id;
    const remaingContact = user.contacts.filter(
      (contactId: String, i: Number) => contactId !== id
    );
    try {
      await pb.collection("users").update(user.id, {
        contacts: remaingContact,
      });
      const AfterDeletion = await pb.collection("users").getOne(user.id, {
        expand: "contacts",
      });
      const contactsAfterDeletion = AfterDeletion.expand.contacts;
      setContacts(contactsAfterDeletion);
    } catch (err) {}
  }

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
          {contacts?.length >= 1 ? (
            <>
              {contacts.map((contact: any, i: number) => (
                <div key={contact} className={styles.eachContact}>
                  <img
                    className={styles.eachContactIcon}
                    src={`https://avatars.dicebear.com/api/initials/${contact.name}.svg`}
                    alt=""
                  />
                  <div>{contact.name}</div>
                  <div
                    ref={contactActionRef.current[i]}
                    className={styles.contactAction}
                  >
                    <div>
                      <span>
                        <Stack direction="row" spacing={2}>
                          <Button variant="text" color="error">
                            Block
                          </Button>
                        </Stack>
                      </span>
                      <span>
                        <BlockIcon />
                      </span>
                    </div>
                    <div>
                      <span>
                        {" "}
                        <Stack spacing={2} direction="row">
                          <Button
                            onClick={() => deleteContact(i)}
                            variant="text"
                          >
                            Delete
                          </Button>
                        </Stack>
                      </span>
                      <span>
                        <DeleteSweepIcon />
                      </span>
                    </div>
                    <div>
                      <div
                        className={styles.makeActionDisplayNone}
                        onClick={() => contactAction(i, "none")}
                      >
                        <ClearIcon />
                      </div>
                    </div>
                  </div>
                  <span
                    className={styles.icon}
                    onClick={() => contactAction(i, undefined)}
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

import React, { useEffect, useRef, useState } from "react";
import styles from "./contact.module.css";
import BasicModal from "../createContactModal/Modal";
import { pb, useSelectedItem, useUserStore } from "../../App";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import BlockIcon from "@mui/icons-material/Block";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { flushSync } from "react-dom";

export interface User {
  username: string;
  id: string;
}

export default function Contacts() {
  const user = useUserStore((state) => state.user);
  const updateSelectedConversation = useSelectedItem(
    (state: any) => state.updateSelectedConversation
  );
  const contactActionRef = useRef<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const [contacts, setContacts] = useState<User[]>([]);
  const [allContacts, setAllContacts] = useState<User[]>([]);

  const getContacts = async () => {
    const record = await pb.collection("users").getOne(user.id, {
      expand: "contacts",
      $autoCancel: false,
    });
    if (!record.expand.contacts?.length) return;
    const userContacts: User[] = record.expand.contacts.map(
      ({ username, id }: { username: String; id: String }) => ({
        username,
        id,
      })
    );
    setContacts(userContacts);
  };

  useEffect(() => {
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

  pb.collection("users").subscribe(user.id, (record) => {
    getContacts();
  });

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
      const userContacts = contactsAfterDeletion.map(
        ({ username, id }: { username: String; id: String }) => ({
          username,
          id,
        })
      );
      setContacts(userContacts);
      updateSelectedConversation(null);
    } catch (err) {}
  }

  function searchContact(e: React.ChangeEvent) {
    if (!allContacts.length) {
      flushSync(() => setAllContacts(contacts));
    }
    if (allContacts) {
      const name = searchRef.current?.value!;
      const filterdContacts = allContacts.filter(
        ({ username }: { username: String }) => username.includes(name)
      );
      setContacts(filterdContacts);
    }
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
            ref={searchRef}
            placeholder="search contacts"
            type="text"
            name=""
            id="user"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              searchContact(e)
            }
          />
        </div>
        <div className={styles.contactList}>
          {contacts?.length >= 1 ? (
            <>
              {contacts.map((contact: any, i: number) => (
                <div key={i} className={styles.eachContact}>
                  <img
                    className={styles.eachContactIcon}
                    src={`https://avatars.dicebear.com/api/initials/${contact.username}.svg`}
                    alt=""
                  />
                  <div
                    onClick={() => updateSelectedConversation(contact.id)}
                    className={styles.contactName}
                  >
                    {contact.username}
                  </div>
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

export function SearchContct({
  placeholder,
  updateBio,
  oldBio,
  setBio,
  searchContact,
}: {
  placeholder: string;
  updateBio?: (bio: string) => void;
  setBio?: (bio: string | null) => void;
  oldBio?: string;
  searchContact?: (name: string) => void;
}) {
  const [name, setName] = useState<string>(oldBio ? oldBio : "");
  function handleChange(e: React.KeyboardEvent) {
    if (name == "") return;
    if (setBio) {
      flushSync(() => setBio(name));
    }
    if (e.code == "Enter" && updateBio) {
      updateBio(name);
    }
    if (searchContact) {
      searchContact(name);
    }
  }
  useEffect(() => {
    if (setBio) {
      setBio(name);
    }
  }, [name]);

  return (
    <>
      <input
        value={name}
        placeholder={placeholder}
        type="text"
        name=""
        id="user"
        onChange={(e) => flushSync(() => setName(e.target.value))}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void =>
          handleChange(e)
        }
      />
    </>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./chat.module.css";
import BasicModal from "../createContactModal/Modal";
import { pb, useUserStore, useSelectedItem } from "../../App";
import { SearchContct } from "../contacts/Contacts";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { getConversationFromPb } from "../chatArea/chatarea";

export default function Chat() {
  const user = useUserStore((state) => state.user);
  const updateSelectedConversation = useSelectedItem(
    (state) => state.updateSelectedConversation
  );
  const [chats, setChats] = useState<any[]>([]);
  const [chatsFetching, setChatFetching] = useState<boolean>(true);

  async function getContactName(chatsId: string[]) {
    const allUsers = await pb
      .collection("users")
      .getFullList({ $autoCancel: false });
    return allUsers.filter((user) => chatsId.includes(user.id));
  }
  const getChatsFromPb = async () => {
    const record = await pb
      .collection("messages")
      .getFullList({ expand: "user1, user2", $autoCancel: false });
    if (!record.length) return;
    const filtered = record.filter(
      ({ user1, user2 }) => user1 == user.id || user2 == user.id
    );
    const chatPeopleId: string[] = [];
    filtered.forEach(({ user1, user2 }) => {
      if (user1 !== user.id) {
        chatPeopleId.push(user1);
        return;
      }
      chatPeopleId.push(user2);
    });
    const contactNames = await getContactName(chatPeopleId);
    if (!contactNames) return;
    setChats(contactNames);
  };

  useEffect(() => {
    (async () => {
      await getChatsFromPb();
      setChatFetching((prv) => false);
    })();
  }, []);

  async function deleteChat(userId: string) {
    const requiredCoversation = await getConversationFromPb(userId, user.id);
    if (!requiredCoversation) return;
    const deleteConversation = await pb
      .collection("messages")
      .delete(requiredCoversation.id);
    getChatsFromPb();
    updateSelectedConversation(null);
  }

  return (
    <>
      <div className={styles.chatHeadWrapper}>
        <h3>Chats</h3>
        <BasicModal />
      </div>
      <div className={styles.searchField}>
        <SearchContct placeholder="Search chats" />
      </div>
      <div className={styles.eachChats}>
        {chats.length ? (
          <div className={styles.eachChats}>
            {chats.map((user) => (
              <div className={styles.user}>
                <span>
                  <img
                    className={styles.userAvatar}
                    src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
                    alt=""
                  />
                </span>
                <div
                  className={styles.chatName}
                  key={user.id}
                  onClick={() => updateSelectedConversation(user.id)}
                >
                  {user.username}
                </div>
                <div
                  onClick={() => deleteChat(user.id)}
                  className={styles.deleteChat}
                >
                  <DeleteSweepIcon />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "20px auto",
            }}
          >
            <div>{chatsFetching ? "Loading..." : "No chats available"}</div>
          </div>
        )}
      </div>
    </>
  );
}

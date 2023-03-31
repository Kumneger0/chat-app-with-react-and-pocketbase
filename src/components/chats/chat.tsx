import React, { useEffect, useState } from "react";
import styles from "./chat.module.css";
import BasicModal from "../createContactModal/Modal";
import { pb, useUserStore, useSelectedItem } from "../../App";
export default function Chat() {
  const user = useUserStore((state) => state.user);
  const updateSelectedConversation = useSelectedItem(
    (state) => state.updateSelectedConversation
  );
  const [chats, setChats] = useState<any[]>([]);
  useEffect(() => {
    async function getContactName(chatsId: string[]) {
      const allUsers = await pb
        .collection("users")
        .getFullList({ $autoCancel: false });
      return allUsers.filter((user) => chatsId.includes(user.id));
    }
    const getChatsFromPb = async () => {
      const { conversations } = await pb.collection("users").getOne(user.id, {
        $autoCancel: false,
      });
      if (conversations) {
        const chatsId = conversations.map(
          ({ userId }: { userId: String }) => userId !== user.id && userId
        );
        const users = await getContactName(chatsId);
        setChats(users);
      }
    };
    getChatsFromPb();
  }, []);

  return (
    <>
      <div className={styles.chatHeadWrapper}>
        <h3>Chats</h3>
        <BasicModal />
      </div>
      <div className={styles.eachChats}>
        {chats.length ? (
          <div>
            {chats.map((user) => (
              <div
                key={user.id}
                onClick={() => updateSelectedConversation(user.id)}
              >
                {user.username}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

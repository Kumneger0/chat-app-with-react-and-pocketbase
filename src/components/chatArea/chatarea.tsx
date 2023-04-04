import React, { useEffect, useState, useRef } from "react";
import styles from "./chararea.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useSelectedItem } from "../../App";
import { pb } from "../../App";
import { useUserStore } from "../../App";
import { Record, UnsubscribeFunc } from "pocketbase";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { formatDistance } from "date-fns";
import { flushSync } from "react-dom";

export async function getConversationFromPb(userId: string, myId: string) {
  const record = await pb
    .collection("messages")
    .getFullList({ expand: "user1,user2" });
  const requiredCoversation = record
    .filter((record: Record) => record.user1 == myId || record.user2 == myId)
    .filter((record) => record.user1 == userId || record.user2 == userId);
  if (requiredCoversation.length) return requiredCoversation[0];
  return null;
}

export default function Chatarea(): JSX.Element {
  const selectedConversation: string = useSelectedItem(
    (state: any) => state.selectedConversation
  );
  const upDateSelectedConversation = useSelectedItem(
    (state) => state.updateSelectedConversation
  );
  const user = useUserStore((state) => state.user);
  const [conversation, setConversation] = useState<any>();
  const [contactDetail, setContactDetail] = useState<any>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [conversationError, setConversationError] = useState<null | string>();
  const msgRef = useRef<HTMLInputElement>(null);
  const chatsRef = useRef<HTMLDivElement>(null);

  async function getContactDetail(contactId: string) {
    if (!contactId) return;
    const contactDetail = await pb.collection("users").getOne(contactId);
    if (contactDetail) return contactDetail;
    return null;
  }

  useEffect(() => {
    setConversation([]);
    getDetail();
    async function getDetail() {
      if (selectedConversation) {
        const contactDetail = await getContactDetail(selectedConversation);
        if (contactDetail) {
          setContactDetail(contactDetail);
        }
        const record = await getConversationFromPb(
          selectedConversation,
          user.id
        );
        if (!record) {
          setConversation([]);
          return;
        }
        flushSync(() => setConversation(record));
        scrollToLast();
      }
    }
  }, [selectedConversation, update]);

  useEffect(() => {
    return () => {
      upDateSelectedConversation(null);
    };
  }, []);

  if (!contactDetail)
    return (
      <div className={styles.displayWhenNoChatSelected}>
        Wellcome to kune chat
      </div>
    );

  async function sendMessage() {
    const value = msgRef.current?.value;
    if (!value) return;
    if (contactDetail.id != selectedConversation) return;
    const message = {
      from: user.id,
      to: selectedConversation,
      text: value,
      date: Date.now(),
    };
    if (!conversation?.id) {
      const record = await pb.collection("messages").create({
        user1: user.id,
        user2: selectedConversation,
        conversations: [message],
      });
      msgRef.current!.value = "";
    }
    if (conversation?.id) {
      const { conversations } = await pb
        .collection("messages")
        .getOne(conversation.id);
      console.log(conversations);
      if (conversations?.length) {
        conversations.push(message);
        console.log("");
        const record = await pb.collection("messages").update(conversation.id, {
          conversations,
        });
        msgRef.current!.value = "";
      }
      if (!conversations?.length) {
        await pb.collection("messages").update(conversation.id, {
          conversations: [message],
        });
        msgRef.current!.value = "";
      }
    }
  }

  function scrollToLast() {
    const lastElement = chatsRef.current?.lastElementChild;
    if (!lastElement) return;
    lastElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  pb.collection("messages").subscribe("*", (record) => {
    if (record.record.user1 == user.id || record.record.user2 == user.id) {
      setUpdate(!update);
    }
  });

  function removeSelectedConversation() {
    upDateSelectedConversation(null);
  }

  function getDate(ms: number) {
    const oldDate = new Date(ms);
    const currentDate = new Date();
    const distance = formatDistance(oldDate, currentDate, {
      addSuffix: true,
      includeSeconds: true,
    });
    return distance;
  }

  if (contactDetail.id == selectedConversation)
    return (
      <>
        <div>
          <div className={styles.head}>
            <div className={styles.userImageAndName}>
              <div
                onClick={removeSelectedConversation}
                className={styles.backBtn}
              >
                <KeyboardBackspaceIcon />
              </div>
              <img
                className={styles.userImage}
                src={`https://avatars.dicebear.com/api/initials/${contactDetail?.username}.svg`}
                alt=""
              />
              <div>{contactDetail && contactDetail.username}</div>
              <span className={styles.onlineStatus}>away</span>
            </div>
          </div>
        </div>
        <div ref={chatsRef} className={styles.conversation}>
          {conversation?.conversations?.length &&
          contactDetail?.id == selectedConversation ? (
            conversation.conversations.map((conversation: any, id: number) => {
              return (
                <>
                  <div
                    key={id}
                    className={`${styles.messageInfo} ${
                      conversation.from == user.id
                        ? styles.you
                        : styles.initials
                    }`}
                  >
                    <div className={styles.picAndText}>
                      <div className={styles.pic}>
                        <img
                          className={styles.sender}
                          src={
                            conversation.from == selectedConversation
                              ? `https://avatars.dicebear.com/api/initials/${contactDetail.username}.svg`
                              : `https://avatars.dicebear.com/api/initials/${user.username}.svg`
                          }
                          alt=""
                        />
                      </div>
                      <div className={styles.mesgText}>{conversation.text}</div>
                    </div>
                    <div className={styles.dateInfo}>
                      <span>
                        {conversation.from == selectedConversation
                          ? contactDetail.username
                          : "you"}
                      </span>
                      <span> {getDate(conversation.date)}</span>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>{conversationError && conversationError}</div>
          )}
        </div>
        <div className={styles.messageInput}>
          <input
            ref={msgRef}
            placeholder="Type your message here"
            type="text"
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key == "Enter") {
                sendMessage();
              }
            }}
          />
          <div onClick={sendMessage} className={styles.sendIcon}>
            <SendIcon />{" "}
          </div>
        </div>
      </>
    );
}

import React, { useEffect, useState, useRef } from "react";
import styles from "./chararea.module.css";
import SendIcon from "@mui/icons-material/Send";
import { useSelectedItem } from "../../App";
import { pb } from "../../App";
import { useUserStore } from "../../App";
import { Record, UnsubscribeFunc } from "pocketbase";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

async function getConversationFromPb(userid: string, conversationId: string) {
  const user = await pb.collection("users").getOne(userid, {
    $autoCancel: false,
  });
  const conversation: any = user.conversations.find(
    (conversation: any) => conversation.userId == conversationId
  );
  return conversation;
}

async function getContactDetailFromPb(contactId: string) {
  let detail;
  try {
    detail = await pb.collection("users").getOne(contactId, {
      $autoCancel: false,
    });
  } catch (err) {
    throw new Error("an error occured");
  }
  if (detail) return detail;
}

export default function Chatarea() {
  const selectedConversation: string = useSelectedItem(
    (state: any) => state.selectedConversation
  );
  const upDateSelectedConversation = useSelectedItem(
    (state) => state.updateSelectedConversation
  );
  const user = useUserStore((state) => state.user);
  const [conversation, setConversation] = useState<any[]>();
  const [contactDetail, setContactDetail] = useState<any>(null);
  const [conversationError, setConversationError] = useState<null | string>();
  const msgRef = useRef<any>();
  useEffect(() => {
    getDetail();
    async function getDetail() {
      if (selectedConversation) {
        const detail = await getContactDetailFromPb(selectedConversation);
        if (detail) {
          setContactDetail(detail);
          console.log(detail);
        }
        const res = await getConversationFromPb(user.id, selectedConversation);
        if (res && res.userId == selectedConversation) {
          setConversation(res.conversation);
          return;
        } else {
          setConversationError("There was an error");
        }
        setConversation([]);
      }
    }
  }, [selectedConversation]);

  let unsubscribe: Promise<UnsubscribeFunc>;

  useEffect(() => {
    return () => {
      pb.collection("users").unsubscribe();
      upDateSelectedConversation("");
    };
  }, []);

  if (!selectedConversation)
    return (
      <div className={styles.displayWhenNoChatSelected}>
        Wellcome to kune chat
      </div>
    );

  async function sendMessage() {
    const { value } = msgRef.current;
    if (!value) return;
    try {
      const { conversations } = await pb.collection("users").getOne(user.id);
      const { conversations: contactConversation } = await pb
        .collection("users")
        .getOne(selectedConversation);
      if (!conversations) {
        await pb.collection("users").update(user.id, {
          conversations: [
            {
              userId: selectedConversation,
              conversation: [
                {
                  from: user.id,
                  to: selectedConversation,
                  date: Date.now(),
                  text: value,
                },
              ],
            },
          ],
        });
      }
      if (!contactConversation) {
        await pb.collection("users").update(selectedConversation, {
          conversations: [
            {
              userId: user.id,
              conversation: [
                {
                  from: user.id,
                  to: selectedConversation,
                  date: Date.now(),
                  text: value,
                },
              ],
            },
          ],
        });
      }
      if (conversations) {
        const findconversationWithMe = conversations.find(
          (conversation: any) => conversation.userId == selectedConversation
        );
        conversations.push({
          userId: selectedConversation,
          conversation: [
            {
              from: user.id,
              to: selectedConversation,
              date: Date.now(),
              text: value,
            },
          ],
        });
        if (!findconversationWithMe) {
          await pb.collection("users").update(user.id, {
            conversations,
          });
        }
        if (findconversationWithMe) {
          findconversationWithMe.conversation.push({
            from: user.id,
            to: selectedConversation,
            date: Date.now(),
            text: value,
          });
          const filterMine = conversations.filter(
            (conversation: any) => conversation.userId !== selectedConversation
          );
          filterMine.push(findconversationWithMe);
          await pb.collection("users").update(user.id, {
            conversations: filterMine,
          });
        }
      }
      if (contactConversation) {
        const findconversationWithMe = contactConversation.find(
          (conversation: any) => conversation.userId == user.id
        );
        if (!findconversationWithMe) {
          await pb.collection("users").update(selectedConversation, {
            conversations: conversations.push({
              userId: user.id,
              conversation: [
                {
                  from: user.id,
                  to: selectedConversation,
                  date: Date.now(),
                  text: value,
                },
              ],
            }),
          });
        }
        if (findconversationWithMe) {
          findconversationWithMe.conversation.push({
            from: user.id,
            to: selectedConversation,
            date: Date.now(),
            text: value,
          });
          const filterMine = conversations.filter(
            (conversation: any) => conversation.userId !== user.id
          );
          filterMine.push(findconversationWithMe);
          await pb.collection("users").update(selectedConversation, {
            conversations: filterMine,
          });
        }
      }
    } catch (err) {
      alert("err occured");
    }
    msgRef.current.value = null;
  }

  pb.collection("users").subscribe(user.id, async (record) => {
    const responce = await getConversationFromPb(user.id, selectedConversation);
    setConversation(responce?.conversation);
  });

  if (contactDetail?.id !== selectedConversation) return <></>;

  function removeSelectedConversation() {
    //@ts-ignore
    upDateSelectedConversation(null);
  }

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
              src={`https://avatars.dicebear.com/api/initials/${contactDetail.username}.svg`}
              alt=""
            />
            <div>{contactDetail && contactDetail.username}</div>
            <span className={styles.onlineStatus}>away</span>
          </div>
        </div>
      </div>
      <div className={styles.conversation}>
        {conversation?.length && contactDetail?.id == selectedConversation ? (
          conversation.map((conversation: any) => {
            return (
              <>
                <div
                  className={`${styles.messageInfo} ${
                    conversation.from == user.id ? styles.you : styles.initials
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
                    <span> {conversation.date}</span>
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
        <input ref={msgRef} placeholder="Type your message here" type="text" />
        <div onClick={sendMessage} className={styles.sendIcon}>
          <SendIcon />{" "}
        </div>
      </div>
    </>
  );
}

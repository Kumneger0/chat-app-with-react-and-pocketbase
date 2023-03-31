import styles from "./App.module.css";
import SideBar from "./components/sidebar/sidebar";
import Profile from "./components/profile/profile";
import { create } from "zustand";
import pocketbase from "pocketbase";
import { createContext, useEffect, useState } from "react";
import Chat from "./components/chats/chat";
import Setting from "./components/setting/Setting";
import Contacts from "./components/contacts/Contacts";
import Bookmarks from "@mui/icons-material/Bookmarks";
import Auth from "./components/authentication/authWrapper/auth";
import Chatarea from "./components/chatArea/chatarea";
import { User, ContextType, SelectedItem } from "./types";

export const pb = new pocketbase("http://127.0.0.1:8090");

export const useUserStore = create<User>((set) => ({
  user: null,
  updateUser: (newUser: any) => set((state: any) => ({ user: newUser })),
}));

export const useSelectedItem = create<SelectedItem>((set) => ({
  selectedItem: "Chats",
  selectedConversation: null,
  updateSelectedItem: (item) => set((state: any) => ({ selectedItem: item })),
  updateSelectedConversation: (conversationId: string) =>
    set((state: any) => ({ selectedConversation: conversationId })),
}));

export const authStateContext = createContext<Partial<ContextType>>({
  authState: "login",
});

function App() {
  const user = useUserStore((state: any) => state.user);
  const selectedItem = useSelectedItem((state: any) => state.selectedItem);
  const selectedConversation = useSelectedItem(
    (state: any) => state.selectedConversation
  );
  const updateUser = useUserStore((state: any) => state.updateUser);
  const [authState, setAuthState] = useState<string>("login");
  const updateSelectedConversation = useSelectedItem(
    (state) => state.updateSelectedConversation
  );

  useEffect(() => {
    const userFromLocal = pb.authStore.model;
    if (userFromLocal) {
      updateUser(userFromLocal);
    }
    pb.authStore.onChange((token: string, record) => {
      if (record) {
        updateUser(record);
      }
      if (!record) {
        updateUser(null);
      }
    });
    return () => {
      pb.collection("users").unsubscribe();
      //@ts-ignore
      updateSelectedConversation(null);
    };
  }, []);

  return (
    <>
      {user ? (
        <>
          {" "}
          <div className={styles.flexWrapper}>
            <div
              style={{
                display:
                  selectedConversation && innerWidth <= 1000
                    ? "none"
                    : "initial",
              }}
              className={styles.sideBar}
            >
              <SideBar />
            </div>
            <div
              style={{
                display:
                  innerWidth <= 1000 && selectedConversation
                    ? "none"
                    : "initial",
              }}
              className={styles.mainActionArea}
            >
              <div>
                {selectedItem == "Chats" && <Chat />}
                {selectedItem == "Setting" && <Setting />}
                {selectedItem == "Contacts" && <Contacts />}
                {selectedItem == "Bookmarks" && <Bookmarks />}
                {selectedItem == "Profile" && <Profile />}
              </div>
            </div>
            <div
              style={{ display: selectedConversation ? "initial" : "none" }}
              className={styles.chatArea}
            >
              <Chatarea />
            </div>
          </div>
          {/* <div className={styles.bottom}>
            <div className={styles.bottomArea}>bottomArea</div>
          </div>{" "} */}
        </>
      ) : (
        <div className={styles.authWrapper}>
          <div
            className={`${styles.authSection} ${
              authState == "login" ? "login" : "signup"
            }`}
          >
            <authStateContext.Provider
              value={{ authState: authState, setAuthState: setAuthState }}
            >
              <Auth />
            </authStateContext.Provider>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

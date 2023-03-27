import styles from "./App.module.css";
import SideBar from "./components/sidebar/sidebar";
import Profile from "./components/profile/profile";
import Login from "./components/authentication/login/login";
import { create } from "zustand";
import pocketbase from "pocketbase";
import { useEffect } from "react";
import Chat from "./components/chats/chat";
import Setting from "./components/setting/Setting";
import Contacts from "./components/contacts/Contacts";
import Bookmarks from "@mui/icons-material/Bookmarks";
export const pb = new pocketbase("http://127.0.0.1:8090");

interface User {
  user: any;
  updateUser: (newUser: any) => any;
}

export const useUserStore = create<User>((set) => ({
  user: null,
  updateUser: (newUser: any) => set((state: any) => ({ user: newUser })),
}));

export const useSelectedItem = create((set) => ({
  selectedItem: "Chats",
  updateSelectedItem: (item: any) =>
    set((state: any) => ({ selectedItem: item })),
}));

function App() {
  const user = useUserStore((state: any) => state.user);
  const selectedItem = useSelectedItem((state: any) => state.selectedItem);
  const updateUser = useUserStore((state: any) => state.updateUser);

  useEffect(() => {
    const userFromLocal = pb.authStore.model;
    if (userFromLocal) {
      updateUser(userFromLocal);
    }
    pb.authStore.onChange((token: string, record) => {
      if (record) {
        updateUser(record);
      }
    });
  }, []);

  return (
    <>
      {user ? (
        <>
          {" "}
          <div className={styles.flexWrapper}>
            <div className={styles.sideBar}>
              <SideBar />
            </div>
            <div className={styles.mainActionArea}>
              {selectedItem == "Chats" && <Chat />}
              {selectedItem == "Setting" && <Setting />}
              {selectedItem == "Contacts" && <Contacts />}
              {selectedItem == "Bookmarks" && <Bookmarks />}
              {selectedItem == "Profile" && <Profile />}
            </div>
            <div className={styles.chatArea}>mainActionArea</div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomArea}>bottomArea</div>
          </div>{" "}
        </>
      ) : (
        <div className={styles.authWrapper}>
          <div className={styles.authSection}>
            <Login />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

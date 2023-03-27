import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./modal.module.css";
import Textarea from "@mui/joy/Textarea";
import { pb } from "../../App";
import { useUserStore } from "../../App";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#424141",
  border: "none",
  boxShadow: 24,
  p: 4,
  height: 500,
};

export default function BasicModal() {
  const user = useUserStore((state: any) => state.user);
  const userRef = React.useRef();
  const passRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function addContact() {
    if (!userRef.current.value) return;
    try {
      const fullList = await pb.collection("users").getFullList();
      const findRequiredContact = fullList.find(
        (record: any) => record.username == userRef.current.value
      );
      if (!findRequiredContact) {
        alert("no contact found");
        return;
      }
      await pb.collection("users").update(user.id, {
        contacts: [...user.contacts, findRequiredContact.id],
      });
      alert("contact added");
    } catch (err) {
      alert("the was an error ");
    }
  }

  return (
    <div className={styles.modalBg}>
      <Button onClick={handleOpen}> +</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className={styles.inputWrapper}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <div className={styles.email}>
              <label htmlFor="user">Username</label>
              <input
                /* @ts-ignore */
                ref={userRef}
                placeholder="username"
                type="text"
                name=""
                id="user"
              />
            </div>
            <div className={styles.name}>
              <label htmlFor="pass">name(optional)</label>
              <input
                /* @ts-ignore */
                ref={passRef}
                placeholder="Name"
                type="text"
                name=""
                id="pass"
              />
            </div>
            <div className={styles.Textarea}>
              <div>Invitation message(optional)</div>
              <Textarea
                size="lg"
                name="Size"
                placeholder="Invitation Message"
              />
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={styles.Button}>
              <Button
                onClick={addContact}
                style={{ background: "rgb(49, 220, 49)", color: "#fff" }}
              >
                Add Contact
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

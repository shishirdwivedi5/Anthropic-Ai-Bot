import React, { useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/usercontext.jsx";
import { UserMessage } from "../context/usercontext.jsx";
import { toast } from "react-toastify";
export default function FetchDetails() {
  const { setUser } = useContext(UserContext);
  const { setuserMess } = useContext(UserMessage);

  useEffect(() => {
    loginUserDetails();
    fetchChatDEtails();
  }, []);

  async function loginUserDetails() {
    await axios
      .get("http://localhost:3000/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("login Api error ", err);
        toast.error("user not logged in");
      });
  }

  async function fetchChatDEtails() {
    await axios
      .get(
        "http://localhost:3000/chat/getchats",

        { withCredentials: true },
      )
      .then((res) => {
        const ress = res.data.isChatsHinstry.map((item) => {
          return item;
        });
        setuserMess(ress);
        console.log("chat details ", res.data.isChatsHinstry);
      })
      .catch((err) => [console.log("chatCreateApi error", err)]);
  }
}

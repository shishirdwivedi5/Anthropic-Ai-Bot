import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UserMessage } from "../context/usercontext.jsx";
import "./Chat.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function Chat() {
  const { userMess, setuserMess } = useContext(UserMessage);

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  const socketRef = useRef(null);

  // useEffect - runs once when component loads
  useEffect(() => {
    // Create socket here
    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
    });

    // Listen for responses
    socketRef.current.on("chatListiner", (response) => {
      (true);
      console.log("AI response received: ", response);
      try {
        const aiResponse = {
          id: Date.now(),
          text: response || "Sorry, I couldn't process your request.",
          sender: "ai",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiResponse]);
           // ✅ response aa gaya
      } catch (error) {
        console.error("Error processing AI response:", error);
      }
    });

    // Cleanup
    return () => {
      socketRef.current?.disconnect();
    };
  }, []); // Empty array = runs once on mount

  const [activeChatId, setActiveChatId] = useState("");
  console.log("activeChatId ", activeChatId);

  async function isChatsDelete() {
    await axios
      .delete(`http://localhost:3000/chat/deletechat/${activeChatId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("chat delete res ", res);
        setuserMess((prev) =>
          prev.filter((chat) => chat.chatId !== activeChatId),
        );

        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log("chat delete error ", err);
        toast.error("Failed to delete chat");
      });
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
  
     setMessages((prev) => [...prev, userMessage]);
      socketRef.current?.emit("chatListiner", inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {/* LEFT SIDEBAR */}
        <div className="sidebar">
          {/* Top - Create Chat Button */}
          <div className="sidebar-top">
            <button
              className="create-chat-btn"
              onClick={() => navigate("/create-chat")}
            >
              ✏️ New Chat
            </button>
          </div>

          {/* Middle - Chats List */}
          <div className="sidebar-middle">
            <h3 className="sidebar-title">Chats</h3>
            <div className="chats-list">
              {userMess.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`chat-item ${
                    activeChatId === chat.chatId ? "active" : ""
                  }`}
                  onClick={() => setActiveChatId(chat.chatId)}
                >
                  <div className="chat-item-content">
                    <p className="chat-title">{chat.title}</p>
                    <p className="chat-date">{chat.date}</p>
                  </div>
                  <button
                    className="chat-delete-btn"
                    onClick={() => isChatsDelete()}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom - User Profile */}
          <div className="sidebar-bottom">
            <button
              className="user-profile-btn"
              onClick={() => navigate("/profile")}
            >
              👤 Profile
            </button>
          </div>
        </div>

        {/* RIGHT MAIN AREA */}
        <div className="main-content">
          {/* Header */}
          <div className="chat-header">
            <h2>ChatBot-Project</h2>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>


          {/* Messages Area */}
          <div className="messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <p className="message-text">{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>

         

          {/* Input Area */}
          <form className="input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="message-input"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

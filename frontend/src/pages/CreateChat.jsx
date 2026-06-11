import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateChat.css";
import axios from "axios";
import { UserMessage } from "../context/usercontext.jsx";
import fetchChatDEtails from "./FetchDetails.jsx";

export default function CreateChat() {
  const { userMess } = useContext(UserMessage);
  
  const navigate = useNavigate();
  const [chatName, setChatName] = useState("");


 
   
  async function fetchChats() {
    
    await axios
      .post(
        "http://localhost:3000/chat/create",
        {
          title: chatName,
        },
        { withCredentials: true },
      )
      .then((res) => {
        
        console.log("chatCreateApi response ", res);
        navigate("/");
      })
      .catch((err) => [console.log("chatCreateApi error", err)]);
  }

  const handleCreateChat = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-chat-container">
      <div className="create-chat-wrapper">
        <div className="create-chat-card">
          {/* Header */}
          <div className="create-chat-header">
            <h1>Create New Chat</h1>
            <p>Start a new conversation</p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateChat} className="create-form">
            <div className="form-group">
              <label htmlFor="chatName">Chat Name</label>
              <input
                id="chatName"
                type="text"
                placeholder="e.g., Web Development Tips"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <p className="form-hint">
                Give your chat a meaningful name to remember it easily
              </p>
            </div>

            <div className="preset-options">
              <h3>Or choose a preset:</h3>
              <div className="preset-buttons">
                <button
                  type="button"
                  onClick={() => setChatName("Programming Help")}
                  className="preset-btn"
                >
                  💻 Programming
                </button>
                <button
                  type="button"
                  onClick={() => setChatName("Web Development")}
                  className="preset-btn"
                >
                  🌐 Web Dev
                </button>
                <button
                  type="button"
                  onClick={() => setChatName("General Knowledge")}
                  className="preset-btn"
                >
                  📚 Knowledge
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!chatName.trim()}
                onClick={() => {
                  fetchChats();
                }}
              >
                Create Chat
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>

          {/* All Created Chats
          {chats.length > 0 && (
            <div className="chats-section">
              <h3 className="chats-title">Your Chats ({chats.length})</h3>
              <div className="chats-list">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="chat-item"
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <div className="chat-info">
                      <p className="chat-name">{chat.title}</p>
                      <p className="chat-date">{chat.date}</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

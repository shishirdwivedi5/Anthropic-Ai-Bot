# Anthopic_AI_Bot 🤖

An advanced AI-powered chatbot platform built with the MERN stack, Gemini API, Socket.IO, MongoDB, and Pinecone Vector Database. The application enables users to create and manage multiple AI chat sessions, perform intelligent conversations, and leverage Retrieval-Augmented Generation (RAG) for context-aware responses.

---

## 🚀 Features

### Authentication & Security

* JWT-based Authentication
* Secure User Login & Registration
* Protected Routes
* HTTP-only Cookie Authentication

### AI Chat System

* Gemini API Integration
* Real-Time AI Responses
* Multi-Chat Management
* Create New Chat Sessions
* Persistent Chat History
* Delete Existing Chats
* User-Specific Conversations

### Real-Time Communication

* Socket.IO Integration
* Instant AI Message Delivery
* Live Chat Experience
* Typing & Response Handling

### RAG (Retrieval Augmented Generation)

* Pinecone Vector Database Integration
* Semantic Search
* Context-Aware Responses
* Knowledge Retrieval System
* Vector Embedding Storage

### Database Management

* MongoDB Database
* User Data Management
* Chat Storage
* Conversation History Tracking

### User Experience

* Responsive User Interface
* Modern Chat Layout
* Chat Sidebar Navigation
* Dynamic Message Rendering
* Real-Time Updates Without Refresh

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Toastify
* Socket.IO Client
* CSS3

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication

### Database

* MongoDB
* Mongoose

### AI & Vector Search

* Google Gemini API
* Pinecone Vector Database

---

## 📂 Project Structure

```bash
Anthopic_AI_Bot/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── context/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── sockets/
│   └── config/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/shishirdwivedi5/Anthropic.git
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

PINECONE_API_KEY=your_pinecone_api_key

```

---

## ▶️ Run Project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 📈 Future Enhancements

* Streaming AI Responses
* Voice-Based Conversations
* File Upload & Analysis
* AI Memory System
* Chat Export Functionality
* Team Collaboration Chats
* Dark/Light Theme Support

---

## 👨‍💻 Author

**Shishir Dwivedi**

Full Stack Developer | MERN Stack Developer

GitHub: https://github.com/shishirdwivedi5

---

## ⭐ Project Highlights

* Real-Time AI Chat Application
* Gemini-Powered Responses
* Pinecone RAG Integration
* JWT Authentication
* Socket.IO Communication
* MongoDB Data Persistence
* Scalable MERN Architecture

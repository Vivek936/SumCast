# 📡 SumCast — UDP Broadcast Sum System

A full-stack networking project where multiple UDP clients
send numbers to a server, which calculates the sum and
broadcasts the result back to all clients — with a live
React dashboard backed by MongoDB.

---

## 🎯 Features

- ✅ UDP socket programming (Python)
- ✅ Multi-client support (3 simultaneous clients)
- ✅ Server-side sum calculation + UDP broadcast
- ✅ REST API backend (Node.js + Express)
- ✅ Cloud database storage (MongoDB Atlas)
- ✅ Live React dashboard with auto-refresh
- ✅ Full history of all sessions

---

## 🛠️ Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Networking    | Python UDP Sockets      |
| Backend       | Node.js + Express       |
| Database      | MongoDB Atlas           |
| Frontend      | React.js + Axios        |
| Communication | HTTP (Python ↔ Node.js) |

---

## 🏗️ System Architecture

```
UDP Client 1 ──→ |              |
UDP Client 2 ──→ | Python UDP   |──→ Node.js API ──→ MongoDB Atlas
UDP Client 3 ──→ | Server       |         ↑
                 |              |          |
                 └──────────────┘    React Dashboard
                  Broadcasts sum      (localhost:3000)
                  back to clients
```

---

## 📁 Project Structure

```
SumCast/
├── python/
│   ├── server.py        # UDP Server
│   └── client.py        # UDP Client
├── backend/
│   ├── server.js        # Express API
│   └── models/
│       └── Result.js    # MongoDB Schema
├── frontend/
│   └── src/
│       ├── App.js
│       └── components/
│           ├── SumCard.js
│           └── HistoryTable.js
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 📋 Prerequisites
- Python 3.x
- Node.js v18+
- MongoDB Atlas account (free)

---

### 🔹 Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SumCast.git
cd SumCast
```

---

### 🔹 Step 2: Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/udpSumDB
PORT=5000
```

Start the backend:
```bash
node server.js
```

---

### 🔹 Step 3: Frontend Setup

```bash
cd ../frontend
npm install
npm start
```
Visit: `http://localhost:3000`

---

### 🔹 Step 4: Run Python UDP System

Open **4 terminals**:

```bash
# Terminal 1 — UDP Server
cd python
python server.py

# Terminal 2 — Client 1
python client.py    # Enter any number

# Terminal 3 — Client 2
python client.py    # Enter any number

# Terminal 4 — Client 3
python client.py    # Enter any number
```

After all 3 clients send numbers:
- Result is **broadcast** back to all clients
- Result is **saved** to MongoDB
- Dashboard **auto-updates** in 5 seconds

---

## 🧪 API Endpoints

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| POST   | `/save`    | Save UDP session result  |
| GET    | `/results` | Get all results          |

---

## 📊 Sample API Response

```json
[
  {
    "_id": "abc123",
    "clientValues": [5, 3, 7],
    "sum": 15,
    "timestamp": "2026-04-07T10:30:00.000Z"
  }
]
```

---

## 👨‍💻 Author

**Vivek Kumar**
- GitHub: [@your_username](https://github.com/Vivek936)

---

## 📄 License

MIT License — free to use and modify.

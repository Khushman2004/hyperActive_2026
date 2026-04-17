# HyperActive 2026 🚀

HyperActive 2026 is a modern, microservices-based project management and workspace application. It features a robust architecture with dedicated services for authentication, API gateway management, and workspace coordination.

## 📁 File Structure

```text
hyperActive_2026/
├── apps/
│   └── my-app/             # Potential secondary/mobile application
├── services/
│   ├── auth-service/       # Express.js service for user authentication & JWT
│   ├── gateway-service/    # API Gateway using http-proxy-middleware
│   └── workspace-service/  # Core logic for workspaces and tasks
│       ├── app/            # Vite + React + Tailwind CSS frontend
│       └── src/            # Express.js backend for workspace data
├── shared/                 # Shared utilities and configurations
└── package.json            # Root configuration and cross-service scripts
```

## 🛠️ Prerequisites

- **Node.js**: Version 18 or higher recommended.
- **MongoDB**: A running instance (local or Atlas) for data persistence.
- **Dependencies**: Install dependencies in the root and each sub-service.

## 🚀 How to Start the Project

### 1. Install Dependencies
Run the following command in the root directory and in each service directory:
```bash
# Root
npm install

# Services
cd services/auth-service && npm install
cd ../gateway-service && npm install
cd ../workspace-service && npm install
cd workspace-service/app && npm install
```

### 2. Configure Environment Variables
Ensure each service has a `.env` file with necessary configurations (MongoDB URI, JWT Secret, Port, etc.).

### 3. Start Backend Services
Launch each service in a separate terminal:
```bash
# In services/auth-service
npm run dev

# In services/gateway-service
npm run dev

# In services/workspace-service
npm run dev
```

### 4. Start the Frontend
```bash
# In services/workspace-service/app
npm run dev
```

The application should now be accessible at the Vite dev port (usually `http://localhost:5173`).

## ✨ Features

- **Microservices Architecture**: Decoupled services for scalability and maintainability.
- **API Gateway**: Unified entry point for all frontend requests.
- **Workspace Management**: Create and manage tasks, schedules, and more.
- **Task Reminders**: Automatic notifications for incomplete activities from previous days.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a premium look and feel.

# Ecommercial_Platform Developer Documentation

## Table of Contents

- Project Overview
- Tech Stack
- Project Structure
- Setup & Installation
- Environment Variables
- Scripts
- Database & Models
- API Structure
- Authentication
- Development Notes

---

## Project Overview

Ecommercial_Platform is a full-stack e-commerce web application.

- **Backend:** Node.js, Express, Sequelize (MySQL)
- **Frontend:** React (Vite), TailwindCSS

---

## Tech Stack

- **Backend:** Node.js, Express, Sequelize ORM, MySQL, Passport.js (Google OAuth)
- **Frontend:** React, Vite, TailwindCSS, FontAwesome
- **Other:** JWT, Multer (file uploads), dotenv, CORS

---

## Project Structure

### Root

```
Ecommercial_Platform/
│
├── client/         # React frontend
├── server/         # Node.js backend
├── README.md
├── package.json
└── ...
```

### Client

- `src/` - React source code
  - `components/` - UI components
  - `pages/` - Page-level components
  - `api/` - API call helpers (Axios)
  - `hooks/`, `layouts/`, `routes/`, `services/`, `utils/`, `styles/`
- `public/` - Static assets

### Server

- `app/`
  - `controllers/` - Route handlers (business logic)
  - `models/` - Sequelize models
  - `routes/` - Express routers
  - `configs/` - DB, Passport, etc.
  - `middlewares/` - Auth, file upload, etc.
  - `reuse/` - Shared logic/utilities
- `server.js` - Main entry point
- `.env` - Environment variables

---

## Setup & Installation

### Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)

### 1. Clone the repository

```sh
git clone https://github.com/MrT2008/Ecommercial_Platform.git
cd Ecommercial_Platform
```

### 2. Install dependencies

**Server:**

```sh
cd server
npm install
```

**Client:**

```sh
cd ../client
npm install
```

### 3. Create the database

```sql
CREATE DATABASE e_commerce;
```

### 4. Configure environment variables

Edit `server/.env`:

```
MYSQL_DATABASE_NAME = "e_commerce"
MYSQL_USERNAME = your_mysql_username
MYSQL_PASSWORD = your_mysql_password
MYSQL_HOST = "localhost"
MYSQL_PORT = 3306
PORT = 8080
GOOGLE_CLIENT_ID = your_google_oauth2.0_client_id
GOOGLE_CLIENT_SECRET = your_google_oauth2.0_client_secret
ACCESS_TOKEN_SECRET = your_secret_here
REFRESH_TOKEN = your_secret_here
SESSION_SECRET = your_secret_here
ACCESS_TOKEN_EXPIRE = 15m
REFRESH_TOKEN_EXPIRE = 7d
COOKIE_EXPIRE = 10800000
```

> **Note:** Replace `your_secret_here` with your own secure random strings.

### 5. Initialize default roles

```sh
cd server
node app/configs/createRoles.js
```

### 6. Create a manager for testing

```sh
node app/configs/createManager.js
```

### 7. Start the server

```sh
npm start
```

### 8. Start the client

```sh
cd ../client
npm run dev
```

---

### 9. (Optional) Add mock data

To create mock data, you can run the `CreateDataScript.sql` file in MySQL Workbench to add mock data to the database

---

## Environment Variables

Create the `.env` file in the `server` directory with the following values:

```properties
MYSQL_DATABASE_NAME = "e_commerce" # your database
MYSQL_USERNAME = your_mysql_username
MYSQL_PASSWORD = your_mysql_password
MYSQL_HOST = "localhost"
MYSQL_PORT = 3306
PORT = 8080
GOOGLE_CLIENT_ID = your_google_oauth2.0_client_id
GOOGLE_CLIENT_SECRET = your_google_oauth2.0_client_secret
ACCESS_TOKEN_SECRET = your_secret_here
REFRESH_TOKEN = your_secret_here
SESSION_SECRET = your_secret_here
ACCESS_TOKEN_EXPIRE = 15m
REFRESH_TOKEN_EXPIRE = 7d
COOKIE_EXPIRE = 10800000
```

---

## Scripts

**Server:**

- `npm start` — Start server with nodemon
- `node app/configs/createRoles.js` — Initialize roles
- `node app/configs/createManager.js` — Create default manager

**Client:**

- `npm run dev` — Start React dev server
- `npm run build` — Build for production

---

## Database & Models

- Sequelize ORM is used for MySQL.
- Models: User, Shop, Product, Order, OrderDetail, Review, Promotion, Announcement, Category, PaymentMethod, ShipInfo, Role, UserRole, Cart, Transaction.
- See `server/app/models` for definitions and associations.

---

## API Structure

- **Base URL:** `http://localhost:8080`
- **Routes:**

  - `/api/auth` — Authentication (login, Google OAuth, etc.)
  - `/manager` — Admin/manager APIs
  - `/seller` — Seller APIs
  - `/buyer` — Buyer APIs
  - `/guest` — Public APIs

- See `server/routes` and `server/app/controllers` for details.

---

## Authentication

- JWT-based authentication for protected routes.
- Google OAuth2.0 supported via Passport.js.
- Session and cookie management via `express-session` and `cookie-parser`.

---

## Development Notes

- **Static files:** Served from `client/public` via Express.
- **CORS:** Only allows requests from `http://localhost:5173` and `http://localhost:5174`.
- **File uploads:** Handled by Multer middleware.
- **Frontend:** Uses React Router for navigation, TailwindCSS for styling.
- **Backend:** All models are synced on server start via `syncModels()`.

---

## Useful Links

- `client/src/api` — API call helpers
- `server/app/controllers` — Business logic
- `server/app/models` — Sequelize models
- `server/routes` — Express routers

---

**Default Manager Account for Testing:**

- Email: `manager@gmail.com`
- Password: `manager`

For more details, see the `README.md` in the root directory.

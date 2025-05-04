# Ecommercial_Platform

Project For Software Engineering

## Overview

This project is an e-commerce platform that consists of a server and a client application. The server is built using Node.js and handles API requests, database interactions, and business logic. The client is built using React and Vite.

## Prerequisites

- Node.js (version 14 or higher)
- MySQL (version 5.7 or higher)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MrT2008/Ecommercial_Platform.git
cd Ecommercial_Platform
```

### 2. Install dependencies

Navigate to the `server` and `client` directories and install the required packages:

```bash
# For the server
cd server
npm install

# For the client
cd ../client
npm install
```

### 3. Create the database

Ensure that you have created the MySQL database as specified in the `.env` file:

```sql
CREATE DATABASE e_commerce;
```

### 4. Configure environment variables

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

> **Note:** Replace `your_secret_here` with your own secure random strings.

> **Note:** Never push the `.env` file to version control. Ensure it is added to `.gitignore`.

### 5. Initialize default roles

Run the `createRoles.js` script to create the default roles (`manager`, `moderator`, `buyer`, `seller`):

```bash
cd server
node app/configs/createRoles.js
```

### 6. Create a manager for testing

Run the `createManager.js` script to create a manager account for testing:

```bash
node app/configs/createManager.js
```

### 7. Start the server

Start the server using the following command:

```bash
npm start
```

### 8. Start the client

Navigate to the `client` directory and start the client:

```bash
cd ../client
npm run dev
```

### 9. (Optional) Add mock data

To create mock data, you can run the `CreateDataScript.sql` file in MySQL Workbench to add mock data to the database (after initializing the data using `npm start` in the server folder).

## Usage

- Once the server is running, you can access the API at `http://localhost:8080`.
- The client application will be available at `http://localhost:5173`.

### Testing the Manager Account

- Use the following credentials to log in as the manager:
  - **Email:** `manager@gmail.com`
  - **Password:** `manager`

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

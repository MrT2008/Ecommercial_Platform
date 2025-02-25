# Ecommercial_Platform
Project For Software Engineering


# e_commerce_platform Server Documentation

## Overview
This project is an e-commerce platform that consists of a server and a client application. The server is built using Node.js and handles API requests, database interactions, and business logic.

## Prerequisites
- Node.js (version 14 or higher)
- MySQL (version 5.7 or higher)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e_commerce_platform/server
   ```

2. **Install dependencies**
   Run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Create the database**
   Ensure that you have created the MySQL database as specified in the `.env` file:
   ```sql
   CREATE DATABASE e_commerce;
   ```

4. **Configure environment variables**
   Update the `.env` file with your MySQL credentials:
   ```
    MYSQL_DATABASE_NAME = "e_commerce" # your database
    MYSQL_USERNAME = your_mysql_username
    MYSQL_PASSWORD = your_mysql_password
    MYSQL_HOST = "localhost"
    MYSQL_PORT = 3306
    PORT = 8080

    # NEVER PUSH THIS FILE TO GITHUB
   ```

5. **Run the server**
   Start the server using the following command:
   ```bash
   npm start
   ```

## Usage
Once the server is running, you can access the API at `http://localhost:8080`. Refer to the API documentation for available endpoints and their usage.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
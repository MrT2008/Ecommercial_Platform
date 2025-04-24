const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.SQLSERVER_DATABASE,
  process.env.SQLSERVER_USERNAME,
  process.env.SQLSERVER_PASSWORD,
  {
    host: process.env.SQLSERVER_HOST,
    dialect: "mssql",
    port: process.env.SQLSERVER_PORT,
    dialectOptions: {
      options: {
        encrypt: process.env.SQLSERVER_ENCRYPT === "true",
        trustServerCertificate: process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE === "true",
        connectionTimeout: parseInt(process.env.SQLSERVER_CONNECTION_TIMEOUT, 10) || 30000,
      },
    },
  }
);

module.exports = sequelize;

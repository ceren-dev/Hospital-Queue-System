require("dotenv").config(); // env dosyasını okumak için
const sql = require("mssql/msnodesqlv8");

const config = {
  driver: "msnodesqlv8",
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};" +
    `Server=${process.env.DB_SERVER};` +
    `Database=${process.env.DB_NAME};` +
    `Uid=${process.env.DB_USER};` +
    `Pwd=${process.env.DB_PASSWORD};` +
    "Encrypt=No;" +
    "TrustServerCertificate=Yes;"
};

sql.connect(config)
.then(()=>console.log("SQLServer bağlandı"))
.catch(err=>console.error(err));

module.exports = sql;
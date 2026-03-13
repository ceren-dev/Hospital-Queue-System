const sqlite3=require("sqlite3").verbose();
// SQLite bağlantısı
const logDB = new sqlite3.Database("log.db", (err) => {
  if (err) {
    console.error("SQLite bağlantı hatası:", err.message);
  } else {
    console.log("SQLite bağlandı");
  }
});
logDB.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);module.exports=logDB;
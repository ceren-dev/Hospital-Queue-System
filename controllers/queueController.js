const sql = require("../config/mssql");
const logDB = require("../config/sqlite");
const Hasta = require("../models/Hasta");

const getQueue = async (req, res) => {
  try {
   
    const result = await sql.query("EXEC BekleyenHastalariGetir");

    const hastalar = result.recordset.map(row =>
      new Hasta(row.sira_id, row.sira_no, row.ad, row.bolum_adi)
    );

    res.json(hastalar);  // frontende gönderiliyor
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "hata" });
  }
};

const callNext = async (req, res) => {
  try {
    await sql.query("EXEC SiradakiHastayiCagir");

    logDB.run(
      "INSERT INTO logs(message) VALUES(?)",
      ["Sıradaki hasta çağrıldı"]
    );

    const io = req.app.get("io");
    io.emit("queueUpdated");

    res.json({ message: "hasta çağrıldı" });  // API nin cevabı
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "hata" });
  }
};

const getLogs = (req, res) => { // Logları getirir
  logDB.all("SELECT * FROM logs ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "hata" });
    } else {
      res.json(rows); // frontende gönderiliyor
    }
  });
};
//route bu fonksiyonları kullanır
module.exports = {
  getQueue,
  callNext,
  getLogs
};

const express=require("express");
const router=express.Router();

const {
  getQueue,
  callNext,
  getLogs
} = require("../controllers/queueController");

router.get("/queue", getQueue);
router.put("/queue/next", callNext);//veri güncelleme isteği gelirse callnext fonksiyonu çalışır
router.get("/logs", getLogs);

module.exports = router;
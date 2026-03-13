
const express=require("express");
const app=express();
const cors=require("cors");
const http=require("http");
const server =http.createServer(app);
const{Server}=require("socket.io");
const queueRoutes=require("./routes/queueRoutes");


const io = new Server(server,{
  cors:{
    origin:"*"
  }
});
app.set("io", io);
io.on("connection",(socket)=>{
  console.log("Bir kullanıcı bağlandı");

  socket.on("disconnect",()=>{
    console.log("Kullanıcı ayrıldı");
  });

});

app.use(cors());
app.use(express.json());
app.use("/",queueRoutes);


server.listen(3000,()=>{
  console.log("Server 3000 portunda çalışıyor");
});
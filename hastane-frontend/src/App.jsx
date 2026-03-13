import { useEffect, useState } from "react";
import {io}from "socket.io-client";

function App() {

  const [queue, setQueue] = useState([]);
 

  // API DEN VERİ ÇEKME FONKSİYONU//HASTALARIN LİSTESİ
  const getQueue = () => {
    fetch("http://localhost:3000/queue")
      .then(res => res.json())
      .then(data => setQueue(data));
  };

  useEffect(() => {

    getQueue();

    const interval=setInterval(getQueue, 3000);  // OTOMATİK YENİLEME
    
    return ()=>{
      clearInterval(interval);
    }

  }, []);

  const callNext = () => {

    fetch("http://localhost:3000/queue/next", {
      method: "PUT"
    })
    .then(() => getQueue());

  };
   const current = queue[0];
   const waiting = queue.slice(1); // ilk elemanı çıkar
  return (
   <div style={{padding:"40px"}}>

    <h1>Hastane Sıra Sistemi</h1>

    <button 
      onClick={callNext}
      style={{
        padding:"12px 25px",
        fontSize:"18px",
        background:"#3498db",
        color:"white",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer",
        marginBottom:"30px"
      }}
    >
      Sıradaki Hastayı Çağır
    </button>

    {current && (
      <div style={{
        border:"3px solid #27ae60",
        padding:"20px",
        marginBottom:"40px",
        textAlign:"center",
        background:"#ecf9f1"
      }}>

        <h2 style={{fontSize:"20px"}}>
          ŞU AN ÇAĞRILAN
        </h2>

        <h1 style={{
          fontSize:"80px",
          color:"#27ae60"
        }}>
          {current.sira_no}
        </h1>

        <p style={{fontSize:"20px"}}>
          {current.ad}
        </p>

        <p>
          {current.bolum_adi}
        </p>

      </div>
    )}

    {waiting.map((q,index)=>(
      <div key={index} style={{
        border:"1px solid gray",
        padding:"10px",
        margin:"10px"
      }}>

        <h2 style={{
          color:"#2980b9",
          fontSize:"28px"
        }}>
          {q.sira_no}
        </h2>

        <p>👤 {q.ad}</p>
        <p>🏥 {q.bolum_adi}</p>

      </div>
    ))}

  </div>
  );
}

export default App;
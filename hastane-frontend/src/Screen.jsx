import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Screen(){

  const [current,setCurrent] = useState(null);

  const getCurrent = () => {
    fetch("http://localhost:3000/current")
      .then(res => res.json())
      .then(data => setCurrent(data));
  }

  useEffect(()=>{

    getCurrent();

    const socket = io("http://localhost:3000");

    socket.on("queueUpdated",()=>{
      getCurrent();
    });

    return ()=>{
      socket.disconnect();
    }

  },[])

  if(!current){
    return <h1>Hasta bekleniyor...</h1>
  }

  return(
    <div style={{
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      background:"#111",
      color:"white"
    }}>

      <h1 style={{fontSize:"40px"}}>
        ŞU AN ÇAĞRILAN
      </h1>

      <h2 style={{
        fontSize:"120px",
        color:"#00e5ff"
      }}>
        {current.sira_no}
      </h2>

      <h3 style={{fontSize:"50px"}}>
        {current.bolum_adi}
      </h3>

      <p style={{fontSize:"30px"}}>
        {current.ad}
      </p>

    </div>
  )
}

export default TVScreen
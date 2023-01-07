import"./style.css"
import io from "socket.io-client"
import { useState } from "react";
import Chat from "./Chat.js";
import 'bootstrap/dist/css/bootstrap.css';

const socket=io.connect("http://localhost:5000");


function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);

  const joinRoom =()=>{
    if(username!==""&&room!==""){
      socket.emit("join_room",room)
      setShowChat(true)
    }
  }
  return (
    <div class="middle">
      {!showChat?
      (
    <div className="text-center App ">
      <div class="app">
        <h3>Join A Chat</h3>
        <input class="inpu form-control " type="text" placeholder="username.." onChange={(e)=>setUsername(e.target.value)} />
        <input class="inpu form-control " type="text" placeholder="room_id.." onChange={(e)=>setRoom(e.target.value)}/>
        <button class="join btn btn-primary" onClick={joinRoom}>join room</button>
      </div>
    </div>
    ):(
    <div>
      <Chat socket={socket} username={username} room={room}/> 
    </div>
    )}
    </div>

  );
}

export default App;

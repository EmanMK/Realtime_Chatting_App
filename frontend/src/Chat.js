import React  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from 'react';
import ScrollToBottom from'react-scroll-to-bottom';


function Chat({socket,username,room}){

    const[currentMessage,setCurrentMessage] = useState("");
    const[messageList,setMessageList]=useState([]);


    const sendMessage=async ()=>{
        if(currentMessage !==""){
            const messageData ={
                room:room,
                username:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
            setCurrentMessage("")
            setMessageList((list)=>[...list,messageData])
        }
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMessageList((list)=>[...list,data]);

            console.log(data)
        })
    },[socket])

    return(
        <section >
            <div class="container py-5">
            
                <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-4">
            
                    <div class="card" id="chat1" >
                    <div
                        class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
                        <i class="fas fa-angle-left"></i>
                        <p class="mb-0 fw-bold">Live chat</p>
                        <i class="fas fa-times"></i>
                    </div>

                    <div class="card-body">
                        <div class="message-cont">
                        <ScrollToBottom class="card-body">
                            {messageList.map((elm)=>{
                                return(
                                    <div class=" container d-flex flex-row mb-4" id={username===elm.username ? "you":"other"}>
                                        <div class="p-3 ms-3 message" >
                                            <p class="small mb-0">{elm.message}</p>
                                            <label class="meta-data">{elm.username} {elm.time}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </ScrollToBottom>
                        </div>
                        <div class="send-msg-cont">
                            <input type="text"  class="form-control " id="textAreaExample" 
                            onChange={(e)=>setCurrentMessage(e.target.value)} 
    
                            onKeyPress={(e)=>{
                                e.key==="Enter" && sendMessage();
                            }}
                            value={currentMessage}
                            />
                            <button class="btn btn-primary " onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                    </div>
            
                </div>
                </div>
            
            </div>
        </section>
    )
}
export default Chat;
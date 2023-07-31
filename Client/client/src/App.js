import React,{ useEffect,useState} from 'react';
import './App.css';
import io from "socket.io-client"
import { Typography,Grid, Box, Button } from '@mui/material';
import chat from "./Ctown2.jpg"
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReactScrollToBottom from "react-scroll-to-bottom"

const socket=io.connect("http://localhost:8008");


function App() {
  const [name,setname]=useState("Unknown");
  const [id,setid]=useState("");
  const [list,setmessagelist]=useState([]);
  const [message,setmessage]=useState("");
  const [room,setroom]=useState("");
   

const legit=(e)=>{
  e.preventDefault();
  setmessage(e.target.value);
} 

  const joinroom=()=>{
    if(room!==""){
      socket.emit('join-room',room);
    }
  };
  const sendMessage=()=>{
    const data=[message,id,name]
    setmessagelist([...list,data]);
    socket.emit("send_message",{message,room,id,name});
    setmessage("");
  };

  useEffect(()=>{
  socket.on("key",(data)=>{
      setid(data);
  })
  socket.on("joiner",()=>{
    alert("Someone has Joined The Chat")
  })
   socket.on("receive_message",(data)=>{
    const dat=[data.message,data.id,data.name]
    setmessagelist([...list,dat]);
    console.log(list);
   });
  },[list]);

  return (
    <div>
    <Typography variant='h3'sx={{backgroundColor:'#1565c0',display:'flex',flexDirection:'row',height:'80px',justifyContent:'center',alignItems:'center'}}>
      
      <Typography variant='h4'  sx={{color:'white',position:'static'}}>Chat Town</Typography>
      <Box component='img' src={chat} ml={4} sx={{height:'70px',position:'static'}}>
      </Box>
    <div className='rajat'>
    <input placeholder='Enter Your Name' id='mesname' onChange={(e)=>{
    setname(e.target.value);
    }}/>
    <input placeholder='Room No.' id='mesinputa' onChange={(e)=>{
    setroom(e.target.value);
    }}/>
    <Button variant="contained" className='cont' onClick={joinroom}  sx={{marginTop:'16px',backgroundColor:'#64ffda',color:'red'}}>Join Room</Button>
   </div>
    </Typography>

    <div className='rocky'>
     <ReactScrollToBottom className='kgf'>
       {list.map((item,i)=>{
        return(
          <div className={id===item[1]?'ml':'mr'}>
          <AccountCircleIcon>
          </AccountCircleIcon>
          {id===item[1]?<span>{`Me:${item[0]}`}</span>:<span>{item[2]}:{item[0]}</span>}
          </div>
        )
       })}
     </ReactScrollToBottom>
    <div className='send'>
        <input type='text' id='mesinput' value={message}  onChange={legit}/>
        <Button variant="contained" className='btn' onClick={sendMessage}  endIcon={<SendIcon />}>Send</Button>
    </div>
    </div>
    </div>
  );
}

export default App;

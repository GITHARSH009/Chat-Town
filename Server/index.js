const express=require('express')
const app=express();

const http=require('http')

const {Server}=require("socket.io")

const cors=require('cors')

app.use(cors());

const server=http.createServer(app);
const user={};

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    socket.emit("key",socket.id);
    console.log(`User Connected:${socket.id}`);


socket.on("join-room",(data)=>{
    socket.join(data);
    socket.to(data).emit("joiner");
});

socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data);
});
});

server.listen(8008,()=>{
    console.log("Server is Running");
});
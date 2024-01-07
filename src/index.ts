import express,{Express,Request,Response} from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server, Socket } from 'socket.io';
import { UserManager } from './UserManager';
import { IOManager } from './IOManager';

const app: Express = express();
export const server = createServer(app);
// const io = new Server(server,{
//     cors:{
//         origin:"*"
//     } 
// });

app.use(express.static('public'))



export const UManager = new UserManager();
const io = IOManager.getInstance();
io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)
    socket.emit('data',socket.id)
    socket.on('PLAY_VIDEO',(userId)=>{
        IOManager.notifyPlay(userId)
    })
    socket.on("PAUSE_VIDEO",(userId)=>{
        IOManager.notifyPause(userId);
    })
    socket.on('JOIN_ROOM',(data)=>IOManager.joinRoom({userId:socket.id,roomId:data,socket:socket}));
    socket.on('disconnect',(reason)=>{
        IOManager.leaveRoom(socket.id)
    })
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
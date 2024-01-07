import { Server } from "socket.io";
import { UManager, server } from ".";
import { UserId } from "./UserManager";



interface ROOM_TYPES{
    userId: UserId;
    roomId:string;
    socket:any;
}

export class IOManager{
    private static io: Server;
    constructor(){
    }
    public static getInstance(){
        if(!this.io){
            this.io = new Server(server,{
                cors:{
                    origin:'*'
                } 
            });
        }
        return this.io;
    }


    static joinRoom({userId,roomId,socket}:ROOM_TYPES){
        UManager.addUser(roomId.toLowerCase(),userId,socket);
        
        console.log(UManager.getUsers())
    }

    static leaveRoom(userId:UserId){
        UManager.leaveUser(userId);
        console.log("User Removed",userId)
        console.log(UManager.getUsers())
    }

    static notifyPlay(userId:UserId){
        const users =  UManager.getUsers();
        const details = users['users'].find((el)=> el.userId == userId);
        if(!details) return;
        const roomId = details['roomId']

        const notifyUsers = users.users.filter((el)=>el['roomId'] = roomId);

        for(let user of notifyUsers){
            user.socket.emit('PLAY_VIDEO',10);
        }
    }

    static notifyPause(userId: UserId){
        const users =  UManager.getUsers();
        const details = users['users'].find((el)=> el.userId == userId);
        if(!details) return;
        const roomId = details['roomId']

        const notifyUsers = users.users.filter((el)=>el['roomId'] = roomId);

        for(let user of notifyUsers){
            user.socket.emit('PAUSE_VIDEO',10);
        } 
    }
}
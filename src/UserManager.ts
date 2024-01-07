
export type UserId = string;
interface User{
    userId: UserId,
    roomId: string,
    socket: any
}
export class UserManager{
    private users: User[];
    constructor(){
        this.users = [];
    }

    addUser(roomId:string,userId: UserId,socket: any){
        const AleadyInRoom = this.users.some((el:any)=>el[userId] === userId);
        if(AleadyInRoom) return;
        this.users.push({
            userId,
            roomId,
            socket
        })
        socket.join(roomId)
    }

    leaveUser(userId:UserId){
        this.users = this.users.filter((el)=> el['userId'] != userId);
    }
    getUsers(){
        return {'users':this.users}
    }
}
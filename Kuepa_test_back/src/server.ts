import * as http from 'http';
import { startServer } from './app';
import { Server } from 'socket.io';
import { connectMongoDb } from './config/mongodb';
import { messageDto } from './components/chat/dto/chat.dto';

async function main() {
    const portExpress = process.env.PORT_EXPRESS || 3000
    const portWebsocket = Number(process.env.PORT_WEBSOCKET) || 3001
    const app = await startServer();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {origin: "*"}
    });

    const onlineUsers:any = [];

    io.on('connection', (socket: any) => {
        socket.on('addNewUser', (userId:string) => {
            !onlineUsers.some((user:any) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        });

        socket.on('sendMessage', (message:any) => {
            io.emit('getMessages', message);
        });
    });

    server.listen(portExpress, () => {
        console.log('Servidor en puerto: '+portExpress);
    });

    io.listen(portWebsocket)

    connectMongoDb();
}

main();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"
import mongoose from 'mongoose';
// import Models
import User from './models/User';
import Story from './models/Stories';
import Message from './models/Messages';
// import Routes
import userRouter from './routes/userRoutes';
// // import Controllers
import UserController from './controllers/userController';

// Mongooose
async function main() {
	await mongoose.connect('mongodb://localhost:27017/project5');
}

main().catch((err) => console.log(err));

const app = express();
app.use(cors)
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
 });

io.on("connection", (socket) => {
  console.log(`User Connected:`,socket.id);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with ID ${socket.id} joined room ${data}`)
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("send-changes", delta => {
    socket.broadcast.emit("receive-changes", delta)

  })

socket.on("disconnect", () => {
    console.log("User Disconnected:",socket.id);
  })
});

httpServer.listen(3001, () => {
  console.log("Server listening on port 3001")
})

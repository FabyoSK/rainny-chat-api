import { io } from "../http";

io.on("connect", (socket) => {
  socket.on("send_message", async (params) => {
    
  });
  socket.on("disconnect", async () => {
    console.log(socket.id);
  });
});

import { io } from '../../http';
import MessageController from '../controllers/MessageController';

const messageController = new MessageController();

io.on('connect', (socket) => {
  const {
    storeRoomMessage,
    indexRoomMessage
  } = messageController;

  socket.on('send_room_message', async (params) => {
    const message = await storeRoomMessage(params);
    // io.to(message.receiver_id).emit(message);
    io.emit('room_message', message);
  });

  socket.on('fetch_room_message', async (params) => {
    const messages = await indexRoomMessage(params.room_id);
    // io.to(params.room_id).emit(messages);
    io.emit('fetch_room_message', messages);
  });

  socket.on('disconnect', async () => {
    console.log(socket.id);
  });
});

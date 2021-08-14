import RoomMessage from '../models/RoomMessage';

export default class MessageController {
  async storeRoomMessage(message) {
    try {
      const roomMessage = await RoomMessage.create({
        content: message.content,
        sender: message.sender_id,
        receiver: message.receiver_id
      });

      return roomMessage;
    } catch (error) {
      console.error(error);
    }
  }

  async indexRoomMessage(room_id) {
    try {
      const messages = await RoomMessage.find({
        receiver: room_id
      });
      // .populate({
      //   path: 'sender',
      //   select: 'username'
      // }).exec((err, messages) => messages);
      return messages;
    } catch (error) {
      console.error(error);
    }
  }
}

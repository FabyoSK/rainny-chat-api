import RoomMessage from '../models/RoomMessage';

export default class MessageController {
  async storeRoomMessage(message) {
    const roomMessage = await RoomMessage.create({
      content: message.content,
      sender_id: message.sender_id,
      receiver_id: message.receiver_id
    });

    // "content": "FSK",
    // "sender_id": "47f51f43-4645-433c-9e3d-dff5920108ff",
    // "receiver_id": "263d2d8b-e19c-4b59-b73c-bbae631cbf58"
    return roomMessage;
  }

  async indexRoomMessage(room_id) {
    const roomMessages = await RoomMessage.find({
      receiver_id: room_id
    });

    // "content": "FSK",
    // "sender_id": "47f51f43-4645-433c-9e3d-dff5920108ff",
    // "receiver_id": "263d2d8b-e19c-4b59-b73c-bbae631cbf58"
    return roomMessages;
  }
}

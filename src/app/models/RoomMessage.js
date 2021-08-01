import { Schema, model } from 'mongoose';
import { uuid } from 'uuidv4';

const RoomMessageSchema = new Schema({
  _id: { type: String, default: uuid },
  content: {
    type: String,
    required: true
  },
  sender_id: {
    type: String,
    ref: 'User',
    required: true
  },
  receiver_id: {
    type: String,
    ref: 'Room',
    required: true
  }
}, {
  timestamps: true
});

const RoomMessage = model('RoomMessage', RoomMessageSchema);

export default RoomMessage;

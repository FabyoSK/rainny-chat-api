import { Schema, model } from 'mongoose';
import { uuid } from 'uuidv4';

const RoomSchema = new Schema({
  _id: { type: String, default: uuid },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  max_participants: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    ref: 'User',
    required: true
  },
  participants: [
    {
      type: String,
      ref: 'User',
      required: true
    }
  ]
}, {
  timestamps: true
});

const Room = model('Room', RoomSchema);

export default Room;

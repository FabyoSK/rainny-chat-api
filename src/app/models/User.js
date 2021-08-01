import { Schema, model } from 'mongoose';
import { uuid } from 'uuidv4';

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  auth_token: {
    type: String,
    default: uuid,
    required: true
  }
}, {
  timestamps: true
});

const User = model('User', UserSchema);

export default User;

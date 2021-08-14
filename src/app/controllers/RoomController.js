import crypto from 'crypto';
import Room from '../models/Room';

export default class RoomController {
  async store(req, res) {
    try {
      const {
        name,
        password,
        max_participants
      } = req.body;

      const hash = crypto
        .createHmac('sha256', process.env.HASH_SECRET)
        .update(password)
        .digest('hex');

      const room = await Room.create({
        name,
        password: hash,
        max_participants,
        owner: req.middleware.user_id,
        participants: [req.middleware.user_id]
      });

      return res.status(200).json(room);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async index(req, res) {
    const rooms = await Room.find({
      participants: {
        $in: req.middleware.user_id
      }
    });
    return res.status(200).json(rooms);
  }
}

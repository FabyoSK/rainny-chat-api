import Room from '../models/Room';

// const rooms = [
//   {
//     id: '01',
//     name: 'Rainners Basement',
//     participants: 0
//   },
//   {
//     id: '02',
//     name: '[VIP] FSK - Room',
//     participants: 1
//   }
// ];

export default class RoomController {
  async store(req, res) {
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
      owner_id: req.middleware.user_id,
      participants: [req.middleware.user_id]
    });

    return res.status(200).json(room);
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

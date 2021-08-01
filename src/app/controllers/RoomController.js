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

    const room = await Room.create({
      name,
      password,
      max_participants,
      owner_id: '47f51f43-4645-433c-9e3d-dff5920108ff',
      participants: ['47f51f43-4645-433c-9e3d-dff5920108ff']
    });

    return res.status(200).json(room);
  }

  async index(req, res) {
    const rooms = await Room.find({
      participants: {
        $in: '47f51f43-4645-433c-9e3d-dff592108ff'
      }
    });
    return res.status(200).json(rooms);
  }
}

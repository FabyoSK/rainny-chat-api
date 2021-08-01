const rooms = [
  {
    id: '01',
    name: 'Rainners Basement',
    participants: 0,
  },
  {
    id: '02',
    name: '[VIP] FSK - Room',
    participants: 1,
  }
]
export default class RoomController {
  async index(req, res) {
    return res.status(200).json(rooms)
  }
}
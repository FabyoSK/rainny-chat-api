import User from '../models/User';

const crypto = require('crypto');


export default class UserController {
  async store(req, res) {
    const {
      username, password
    } = req.body;

    const hash = crypto
      .createHmac('sha256', process.env.HASH_SECRET)
      .update(password)
      .digest('hex');

    try {
      const user = await User.create({
        username,
        password: hash
      });

      return res.status(201).json(user);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

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

  async login(req, res) {
    const {
      username, password
    } = req.body;

    const hash = crypto
      .createHmac('sha256', process.env.HASH_SECRET)
      .update(password)
      .digest('hex');

    try {
      const user = await User.findOne({
        username,
        password: hash
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({
        id: user._id,
        token: user.auth_token,
        username: user.username
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async session(req, res) {
    const auth_token = req.headers.authorization.split(' ')[1];

    try {
      const user = await User.findOne({
        auth_token
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({
        id: user._id,
        token: user.auth_token,
        username: user.username
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

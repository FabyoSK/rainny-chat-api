import User from '../../models/User';

export async function authorize(req, res, next) {
  try {
    const auth_token = req.headers.authorization.split(' ')[1];

    const user = await User.findOne({
      auth_token
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Unauthorized' });
    }
    req.middleware = {
      user_id: user._id
    };

    next();
  } catch (e) {
    return res
      .status(401)
      .json({ error: 'Unauthorized' });
  }
}

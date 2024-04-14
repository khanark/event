const router = require('express').Router();

// import the service
const UserService = require('../services/user');

// expose endpoints
router.post('/register', async (req, res) => {
  try {
    const { accessToken, refreshToken } = await UserService.register(req.body);
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.sendStatus(200);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { accessToken, refreshToken } = await UserService.login(req.body);
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    res.sendStatus(200);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// TODO: handle the logout the right way
// router.get('/logout', authorize, async (req, res) => {
//   res.status(200).json({ message: 'You have been logged out!' });
// });

module.exports = router;

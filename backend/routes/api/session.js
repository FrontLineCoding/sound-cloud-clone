const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//Gets session (currently logged in) user
router.get('/user', requireAuth, async (req, res) => {
  const { user } = req;
  const token = await setTokenCookie(res, user);
  const payload = {
    id : user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    // username: user.username,
    token
  }
  return res.json(payload);
});

//Login
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { email, password } = req.body;
      const user = await User.login({ email, password });
      const token = await setTokenCookie(res, user)

      if (!user) {
        const err = new Error('Invalid Credentials');
        err.status = 401;
        err.title = 'Login failed';
        return next(err);
      }

      const payload = {
        id : user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // username: user.username,
        token
      }
      res.status(200);
      return res.json(payload);
    }
  );


  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
router.get('/',restoreUser, (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );



module.exports = router;

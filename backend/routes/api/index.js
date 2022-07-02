const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');



router.use(restoreUser); //<---- ME FIRST
router.use('/session', sessionRouter);
router.use('/users', usersRouter);



router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});



//token testing
//#region
// GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
// const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
// setTokenCookie(res, user);
// return res.json({ user });
// });

// router.use(restoreUser);

// router.get(
// '/restore-user',
// (req, res) => {
//   return res.json(req.user);
// }
// );

// router.get(
// '/require-auth',
// requireAuth,
// (req, res) => {
//   return res.json(req.user);
// }
// );
//#endregion



module.exports = router;

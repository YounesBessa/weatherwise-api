const router = require('express').Router();

const {userRegister, userLogin} = require('../controller/authUserController')

router.post('/register',  userRegister);
router.post('/login', userLogin)

module.exports = router;
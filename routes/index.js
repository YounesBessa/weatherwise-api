
const router = require('express').Router();

const authUser = require('./authUser');
const weather = require('./weather')
const user = require('./user')

router.use('/api/v1/', authUser);
router.use('/api/v1/', weather);
router.use('/api/v1/', user)

module.exports = router;
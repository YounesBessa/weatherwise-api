const router = require('express').Router();

const {updateUser, findUser, passUpdate} = require('../controller/userController')

router.put('/pass-update/:id',  passUpdate);
router.put('/user-update/:id',  updateUser);
router.get('/:id', findUser)

module.exports = router;
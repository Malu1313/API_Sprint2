const router = require('express').Router();//importando o módolo express
const userController = require('../controller/userController');

router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getAllUser);
router.put('/usuarios', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);

//Login
router.post('/login', userController.loginUser);

module.exports = router
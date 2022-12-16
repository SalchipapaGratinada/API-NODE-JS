const express = require('express');
const router =  express.Router();
const {validatorLogin, validatorRegister} = require('../validators/auth')
const { loginControler, registerControler } = require('../controllers/auth');

/**´´
 * crear items
 */
router.post('/register', validatorRegister, registerControler);
router.post('/login', validatorLogin, loginControler);


module.exports = router;
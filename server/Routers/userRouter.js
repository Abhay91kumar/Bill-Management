const userCtrl = require('../Controller/userCtrl');
const Auth=require('../Middleware/auth')


const router = require('express').Router();

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/admin',userCtrl.addminDetail)
router.get('/refresh_token', userCtrl.refreshtoken);
router.get('/information',Auth,userCtrl.getUser)



module.exports = router
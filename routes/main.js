const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const apiController = require('../controllers/api')
const mainController = require('../controllers/main')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

router.post('/login', ensureGuest, authController.postLogin)
router.post('/logout', ensureAuth, authController.logout)
router.post('/signup', ensureGuest, authController.postSignup)

router.post('/like', ensureAuth, mainController.addLike)
router.post('/hate', ensureAuth, mainController.hate)

router.get('/getProfile', ensureAuth, mainController.getProfile)

router.delete('/eraseLikes', ensureAuth, mainController.eraseLikes)
router.delete('/eraseNotLikes', ensureAuth, mainController.eraseNotLikes)
router.delete('/deleteUser', ensureAuth, mainController.deleteUser)

router.get('/check', apiController.checkUser)

module.exports = router
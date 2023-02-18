const express = require('express')
const router = express.Router()
const apiController = require('../controllers/api')
const {ensureAuth} = require('../middleware/auth')

router.get('/trailer', ensureAuth, apiController.getTrailer)
router.get('/rec',ensureAuth, apiController.rec)
router.get('/trending', ensureAuth, apiController.trending)
router.get('/getlibrary/:num?', ensureAuth, apiController.getLibrary)

module.exports = router
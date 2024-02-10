const router = require('express').Router();
const storgesCotroller = require("../controllers/storge.controllers");

router.get('/getall', storgesCotroller.getAllStorge)


module.exports = router;

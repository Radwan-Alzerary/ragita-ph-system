const router = require("express").Router();
const manufactorCotroller = require("../controllers/manufactory.controllers");

router.get("/getall",manufactorCotroller.getAllManufactor );
// router.get("/getone/:id",categoryCotroller.getOneCategory );
// router.get("/getproduct/:id",categoryCotroller.getOneCategory );

module.exports = router;

const router = require("express").Router();
const costemerCotroller = require("../controllers/constemers.controllers");

router.get("/getall",costemerCotroller.getAllCostemes );
router.get("/getdepts",costemerCotroller.getAllCostemesWithDepts );
// router.get("/getone/:id",categoryCotroller.getOneCategory );
// router.get("/getproduct/:id",categoryCotroller.getOneCategory );

module.exports = router;

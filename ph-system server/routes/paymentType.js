const router = require("express").Router();
const paymentTypeCotroller = require("../controllers/paymentType.controllers");

router.get("/getall",paymentTypeCotroller.getAllPaymentType );

module.exports = router;

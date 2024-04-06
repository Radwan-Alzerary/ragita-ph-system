const InitializControll = require('../controllers/purchases.controller');

const router = require('express').Router();

router.get("/Initializ", InitializControll.InitializPurchases);
router.post("/ubdateCurrent", InitializControll.ubdateCurrent);
router.post("/addproduct", InitializControll.addproduct);
router.post("/ProductInsideInvoiceChange", InitializControll.ProductInsideInvoiceChange);

module.exports = router;

const InitializControll = require('../controllers/purchases.controller');

const router = require('express').Router();

router.get("/Initializ", InitializControll.InitializPurchases);
router.post("/ubdateCurrent", InitializControll.ubdateCurrent);
router.post("/addproduct", InitializControll.addproduct);
router.post("/removeProductInsideInvoice", InitializControll.removeProductInsideInvoice);
router.post("/ProductInsideInvoiceChange", InitializControll.ProductInsideInvoiceChange);
router.post("/finish", InitializControll.handeFinish);

module.exports = router;

const router = require("express").Router();
const invoiceControll = require("../controllers/invoice.controllers");

router.get("/getAll", invoiceControll.getAllInvoice);
router.get("/getActiveInvoice", invoiceControll.getAllInvoice);
router.get("/getDebtInvoice", invoiceControll.getAllInvoice);
router.get("/getReturnedInvoice", invoiceControll.getAllInvoice);
router.get("/getOne/:invoiceId", invoiceControll.getOneInvoice);

router.post("/editOne/:invoiceId", invoiceControll.editOneInvoice);

router.post("/addproduct", invoiceControll.postNewProduct);
router.post("/newproductpackage", invoiceControll.updateProductPackage);
router.post("/updateInvoiceDiscount", invoiceControll.updateInvoiceDiscount);
router.post(
  "/updateInvoiceAmountPaid",
  invoiceControll.updateInvoiceAmountPaid
);
router.post("/updateInvoicePrice", invoiceControll.updateInvoiceFullPrice);
router.post("/getPrice", invoiceControll.getPrice);
router.post("/newproductquantity", invoiceControll.updateProductQuantity);
router.delete(
  "/removeproduct/:requestQueueId/product/:productId",
  invoiceControll.removeProductInside
);
module.exports = router;

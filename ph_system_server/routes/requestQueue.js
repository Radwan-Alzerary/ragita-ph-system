const router = require("express").Router();
const requestQueueCotroller = require("../controllers/requestQueue.controllers");

router.get("/getall",requestQueueCotroller.getAllRequestQueue );
router.get("/getproducts/:requestQueueId",requestQueueCotroller.getProductInsideRequestQueue);
router.get("/getCostemerValue/:requestQueueId",requestQueueCotroller.getQueueCostemerValue);
router.get("/getPaymentValue/:requestQueueId",requestQueueCotroller.getPaymentValue);
router.post("/newqueue", requestQueueCotroller.postNewRequestQueue);
router.post("/finish", requestQueueCotroller.postFinishRequest);
router.post("/cancele", requestQueueCotroller.postCanceleRequest);
router.post("/costemercurrentname", requestQueueCotroller.costemerCurrentName);
router.post("/costemercurrentnumber", requestQueueCotroller.costemerCurrentNumber);
router.post("/paymentTypeUpdate", requestQueueCotroller.paymentTypeUpdate);
router.post("/costemercurrentnumber", requestQueueCotroller.costemerCurrentNumber);

module.exports = router;


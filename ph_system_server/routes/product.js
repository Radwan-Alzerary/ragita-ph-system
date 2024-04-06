const router = require("express").Router();
const productCotroller = require("../controllers/product.controllers");

router.get("/getall", productCotroller.getAllProduct);
router.post("/add", productCotroller.addProduct);
router.get("/searchName/:searchName",productCotroller.searchItemByName)
router.get("/searchName/",productCotroller.getAllProduct)
router.get("/favorite/",productCotroller.getFavoriteProduct)
router.post("/changefavorite/",productCotroller.changefavorite)

router.get("/total/",productCotroller.getProductTotal)
router.delete("/delete/:id",productCotroller.deleteProduct)
router.get("/favorites/",productCotroller.getProductFavorites)
router.get("/expiring-in-three-months/",productCotroller.getProductExpiringInThree)
router.get("/expiring-in-one-month/",productCotroller.getProductExpiringInOneMonth)
router.get("/expired/",productCotroller.getProductExpired)
router.get("/without-barcode/",productCotroller.getProductWithoutB)
router.get("/without-category/",productCotroller.getProductWithoutCategory)
router.get("/low-quantity-100/",productCotroller.getProductQuantityLessThan100)
router.get("/low-quantity-20/",productCotroller.getProductQuantityLessThan20)
router.get("/low-quantity-10/",productCotroller.getProductQuantityLessThan10)
router.get("/low-quantity-5/",productCotroller.getProductQuantityLessThan5)
router.get("/negative-quantity/",productCotroller.getOutOfStockProduct)


module.exports = router;

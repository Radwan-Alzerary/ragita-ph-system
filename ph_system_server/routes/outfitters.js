const router = require("express").Router();
const categoryCotroller = require("../controllers/outfittersControlers");

// Get all categories
router.get("/getall",categoryCotroller.getAllCategor );

router.get("/getone/:id",categoryCotroller.getOneCategory );
router.get("/getproducts/:categoryId",categoryCotroller.getProductsByCategory );
router.post("/newcategory", categoryCotroller.addCategory);

//remove category
router.delete("/delete/:id",categoryCotroller.deleteCategory );

// Edit a category
router.patch("/edit/:id",categoryCotroller.editCategory );

module.exports = router;

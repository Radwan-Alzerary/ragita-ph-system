const router = require("express").Router();
const packageCotroller = require("../controllers/package.controllers");

router.get("/getall", packageCotroller.getAllPackage);
router.get("/getnamelist", packageCotroller.getAllPackageName);

router.get("/getnested/:parentId", packageCotroller.getNestedFromPackageId);
router.get("/getPackage/:id", packageCotroller.getPackage);
router.post("/new", packageCotroller.addParentPackage);
router.post(
  "/getPackageFillingForChild",
  packageCotroller.getPackageFillingForChild
);

router.patch("/newnested/:parentId", packageCotroller.addNestedPackage);
router.patch("/edit/:packageId", packageCotroller.editPackage);
router.delete("/delete/:packageId", packageCotroller.deletePackage);

module.exports = router;

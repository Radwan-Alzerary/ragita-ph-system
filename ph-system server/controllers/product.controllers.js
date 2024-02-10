//category
const Manufactor = require("../model/manufactor"); // Adjust the path to your Manufacturer model file
const Product = require("../model/product"); // Adjust the path to your Manufacturer model file
const Country = require("../model/country"); // Adjust the path to your Manufacturer model file

exports.getProduct = async (req, res) => {};

exports.getAllProduct = async (req, res) => {
  try {
    const product = await Product.find().populate("prices.packaging");
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteProduct = async (req, res) => {
  try {
    const product = await Product.find({ favorite: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changefavorite = async (req, res) => {
  const product = await Product.findById(req.body.productId);
  const updateProduct = await Product.findByIdAndUpdate(req.body.productId, {
    favorite: !product.favorite,
  });
  res.json(updateProduct);
};

exports.addProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      scientificName,
      tradeName,
      anotherName,
      specialCode,
      category,
      storge,
      manufactor,
      expireMonth,
      expireYear,
      purchasingPrice,
      lessamount,
      rackNumber,
      generalInformation,
      medicalInformation,
      sideEffects,
      numberOfDoses,
      comments,
      mainPackage,
      countery,
      packageNestedData,
      orginBarcode,
      generatedBarcode,
      defaultPackage,
      unActivePackage,
      // Add any other fields you need to extract from the request body
    } = req.body;
    var expireDate = new Date(expireYear, expireMonth - 1, 1);

    let manufacturerId = "";
    let countryId = "";
    const countryAvailable = await Country.findOne({ name: countery });
    if (!countryAvailable) {
      const newCountry = new Country({ name: countery });
      await newCountry.save();
      countryId = newCountry._id.toString();
    } else {
      countryAvailable.productInsideCount =
        countryAvailable.productInsideCount + 1;
      await countryAvailable.save();

      countryId = countryAvailable._id.toString();
    }

    if (manufactor.id) {
      manufacturerId = manufactor.id;
    } else {
      const newManufacturer = new Manufactor({ name: manufactor.name });
      await newManufacturer.save();
      manufacturerId = newManufacturer._id.toString();
    }

    // Create an array to hold prices
    const prices = [];

    // Extract data from packageNestedData and convert it into prices
    for (const packageId in packageNestedData) {
      if (
        packageNestedData.hasOwnProperty(packageId) &&
        !unActivePackage.includes(packageId)
      ) {
        const packageData = packageNestedData[packageId];
        // Extract data from packageData
        const {
          packagingValue,
          singlePriceValue,
          singleProfitValue,
          wholesalePriceValue,
          wholesaleProfitValue,
          specialPriceValue,
          specialProfitValue,
          totallPackageInside,
          amount,
        } = packageData;

        // Create a price object and push it to the prices array
        prices.push({
          packaging: packageId,
          singlePrice: singlePriceValue,
          wholesalePrice: wholesalePriceValue,
          specialPrice: specialPriceValue,
          filling: packagingValue,
          quantity: totallPackageInside,
          singleProfitPercentage: singleProfitValue,
          wholeProfitPercentage: wholesaleProfitValue,
          specialProfitPercentage: specialProfitValue,
          amount,
        });
      }
    }

    // Create a new product instance using the Product model
    const newProduct = new Product({
      name: {
        scientificName,
        tradeName,
        anotherName,
      },
      specialCode,
      specifications: {
        generalInformation,
        medicalInformation,
        sideEffects,
        numberOfDoses,
        comments,
      },
      specialBarcode: generatedBarcode,
      manufacturBarcode: orginBarcode,
      defaultPackaging: defaultPackage,
      purchasingPrice,
      lessamount,
      expireDate: expireDate,
      countery: countryId,
      rackNumber,
      category: category,
      storge: storge,
      manufactor: manufacturerId,
      // Assign the prices array to the prices field
      prices,
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchItemByName = async (req, res) => {
  const searchName = req.params.searchName;
  try {
    const product = await Product.find({
      $or: [
        { "name.scientificName": { $regex: searchName, $options: "i" } },
        { "name.tradeName": { $regex: searchName, $options: "i" } },
        { "name.anotherName": { $regex: searchName, $options: "i" } },
        { "name.specialCode": { $regex: searchName, $options: "i" } },
      ],
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteProduct = async (req, res) => {};

exports.getProductTotal = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.json(totalProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductFavorites = async (req, res) => {
  try {
    const favoriteProducts = await Product.countDocuments({ favorite: true });
    res.json(favoriteProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductExpiringInThree = async (req, res) => {
  try {
    const currentDate = new Date();
    const threeMonthsLater = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 3,
      currentDate.getDate()
    );
    const expiringProducts = await Product.countDocuments({
      expireDate: { $lte: threeMonthsLater },
    });
    res.json(expiringProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductExpiringInOneMonth = async (req, res) => {
  try {
    const currentDate = new Date();
    const oneMonthLater = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
    const expiringProducts = await Product.countDocuments({
      expireDate: { $lte: oneMonthLater },
    });
    res.json( expiringProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductExpired = async (req, res) => {
  try {
    const currentDate = new Date();
    const expiredProducts = await Product.countDocuments({
      expireDate: { $lte: currentDate },
    });
    res.json( expiredProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductWithoutB = async (req, res) => {
  try {
    const productsWithoutBarcode = await Product.countDocuments({
      specialBarcode: null,
    });
    res.json( productsWithoutBarcode );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductWithoutCategory = async (req, res) => {
  try {
    const productsWithoutCategory = await Product.countDocuments({
      category: null,
    });
    res.json(productsWithoutCategory );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductQuantityLessThan100 = async (req, res) => {
  try {
    const lowQuantityProducts = await Product.countDocuments({
      quantity: { $lt: 100 },
    });
    res.json( lowQuantityProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductQuantityLessThan20 = async (req, res) => {
  try {
    const lowQuantityProducts = await Product.countDocuments({
      quantity: { $lt: 20 },
    });
    res.json(lowQuantityProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductQuantityLessThan10 = async (req, res) => {
  try {
    const lowQuantityProducts = await Product.countDocuments({
      quantity: { $lt: 10 },
    });
    res.json( lowQuantityProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getProductQuantityLessThan5 = async (req, res) => {
  try {
    const lowQuantityProducts = await Product.countDocuments({
      quantity: { $lt: 5 },
    });
    res.json( lowQuantityProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getOutOfStockProduct = async (req, res) => {
  try {
    const negativeQuantityProducts = await Product.countDocuments({
      quantity: { $lt: 0 },
    });
    res.json(negativeQuantityProducts );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

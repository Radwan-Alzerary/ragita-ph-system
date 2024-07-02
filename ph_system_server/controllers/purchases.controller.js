const PaymentType = require("../model/PaymentType");
const Package = require("../model/packing");
const Product = require("../model/product");
const Purchases = require("../model/purchases");
const Storge = require("../model/storge");
const { increasesQuantity } = require("../services/quantityOperations");

exports.InitializPurchases = async (req, res) => {
  try {
    const state = "قيد المعالجة";
    // Check if there is an existing purchase invoice with the specified state
    const existingInvoice = await Purchases.findOne({ state }).populate({
      path: "product.id",
      populate: {
        path: "prices.packaging",
      },
    });

    if (existingInvoice) {
      res.json(existingInvoice);
    } else {
      const paymentType = await PaymentType.findOne({ name: "نقدي" });
      const storge = await Storge.findOne({ name: "مخزن الادويه" });
      console.log(paymentType);
      console.log(storge);
      const purchaseInvice = new Purchases({
        PaymentType: paymentType.id,
        storge: storge.id,
        state: "قيد المعالجة",
        invoiceDate: Date.now(),
      });
      await purchaseInvice.save();
      res.json(purchaseInvice);
    }
  } catch (error) {
    console.error("Error adding item to purchase invoice:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
exports.ubdateCurrent = async (req, res) => {
  try {
    const purchase = await Purchases.findByIdAndUpdate(
      req.body.id,
      { [req.body.type]: req.body.value },
      { new: true } // This option ensures the updated document is returned
    ).populate("product.id");
    console.log(purchase);
    res.json(purchase);
  } catch (error) {
    console.error("Error adding item to purchase invoice:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
exports.addproduct = async (req, res) => {
  try {
    const purchase = await Purchases.findById(req.body.id).populate({
      path: "product.id",
      populate: {
        path: "prices.packaging",
      },
    });
    // Check if productId already exists in the product array
    const existingProductIndex = purchase.product.findIndex(
      (item) => item.id._id.toString() === req.body.productId
    );
    const product = await Product.findById(req.body.productId);
    console.log(existingProductIndex);
    if (existingProductIndex === -1) {
      // If productId doesn't exist, push it into the product array
      console.log(product.defaultPackaging);
      purchase.product.push({
        id: req.body.productId,
        storageType: product.defaultPackaging.toString(),
        expireDate: product.expireDate,
      });
    }
    await purchase.save();

    // Save the updated purchase document
    const newProduct = await Purchases.findById(req.body.id).populate({
      path: "product.id",
      populate: {
        path: "prices.packaging",
      },
    });
    res.json(newProduct);
  } catch (error) {
    console.error("Error adding item to purchase invoice:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
exports.ProductInsideInvoiceChange = async (req, res) => {
  try {
    const existingInvoice = await Purchases.findById(req.body.id);

    if (!existingInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Check if the item already exists in the items array
    const existingItem = existingInvoice.product.find((item) =>
      item.id.equals(req.body.productId)
    );

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found in the invoice" });
    }

    // Update the specified inputType of the existing item
    existingItem[req.body.type] = req.body.value;

    // Save the updated invoice
    await existingInvoice.save();
    const newProduct = await Purchases.findById(req.body.id).populate({
      path: "product.id",
      populate: {
        path: "prices.packaging",
      },
    });

    res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeProductInsideInvoice = async (req, res) => {
  const { PurchasesId } = req.body;
  const { productId } = req.body;

  try {
    // Find the pharmaceutical group by ID
    const group = await Purchases.findById(PurchasesId).populate({
      path: "product.id",
      populate: {
        path: "prices.packaging",
      },
    });
    if (!group) {
      return res
        .status(404)
        .json({ message: "Pharmaceutical group not found" });
    }
    console.log(productId);
    // Find the index of the pharmaceutical in the group
    const pharmaceuticalIndex = group.product.findIndex(
      (item) => item._id.toString() === productId
    );

    // Check if the pharmaceutical exists in the group
    if (pharmaceuticalIndex === -1) {
      return res
        .status(404)
        .json({ message: "Pharmaceutical not found in the group" });
    }

    // Remove the pharmaceutical from the group
    group.product.splice(pharmaceuticalIndex, 1);

    // Save the updated group
    await group.save();

    // Return success response
    res.status(200).json(group);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.handeFinish = async (req, res) => {
  const purchaseInvoice = await Purchases.findById(req.body.id);
  let fullCost = 0;
  let fullquantity = 0;
  let fulldiscount = 0;
  let fullgift = 0;
  let fullreturn = 0;
  let fullprice = 0;

  for (const product of purchaseInvoice.product) {
    fullquantity += product.quantity;
    fullgift += product.gift;
    fullreturn += product.returned;
    fulldiscount += product.purchasesDiscount;

    const quantity = parseFloat(product.quantity) || 0;
    const price = parseFloat(product.purchasesPrice) || 0;
    const discount = parseFloat(product.purchasesDiscount) || 0;
    const gift = parseFloat(product.gift) || 0;
    const representativeGift = parseFloat(product.RepresentativeGift) || 0;
    let totalPrice = 0;
    let giftCount = 0;
    // Calculate total cost considering discounts and gifts
    totalPrice = quantity * price;
    console.log(product.giftType);
    if (product.giftType === "قطعة") {
      console.log(gift + representativeGift);
      giftCount = gift + representativeGift;
    } else {
      giftCount = gift;
    }
    totalPrice = totalPrice - discount;
    let singleCost = 0;

    if (product.bounsPersentage > 0) {
      giftCount = Math.round(
        giftCount * ((100 - product.bounsPersentage) / 100)
      );

      singleCost = totalPrice / (quantity + giftCount);
    } else {
      singleCost = totalPrice / (quantity + giftCount);
    }

    if (product.giftType === "قطعة") {
      product.quantity =
        product.quantity + product.gift + product.RepresentativeGift;
    } else {
      product.quantity = product.quantity + product.gift;
    }
    console.log(product.quantity);

    const updateProduct = await Product.findById(product.id);

    const newPurchaseData = {
      expireDate: product.expireDate,
      quantity: product.quantity,
      quantityLeft: product.quantity,
      package: product.storageType,
      cost: singleCost,
      Purchases: req.body.id,
    };
    console.log(newPurchaseData);
    updateProduct.purchasesData.push(newPurchaseData);
    await updateProduct.save();
    await increasesQuantity(product);
  }
  purchaseInvoice.fullquantity = fullquantity;
  purchaseInvoice.fulldiscount = fulldiscount;
  purchaseInvoice.fullgift = fullgift;
  purchaseInvoice.fullreturn = fullreturn;
  purchaseInvoice.fullprice = fullprice;
  purchaseInvoice.fullCost = fullprice;
  purchaseInvoice.state = "مكتمل";
  await purchaseInvoice.save();
  res.json("done");
};
exports.getAll = async (req, res) => {
  try {
    const purchaseList = await Purchases.find();
    res.json(purchaseList);
  } catch (error) {
    console.error("Error adding item to purchase invoice:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const PaymentType = require("../model/PaymentType");
const Purchases = require("../model/purchases");
const Storge = require("../model/storge");

exports.InitializPurchases = async (req, res) => {
  try {
    const state = "قيد المعالجة";
    // Check if there is an existing purchase invoice with the specified state
    const existingInvoice = await Purchases.findOne({ state }).populate(
      "product.id"
    );
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
    const purchase = await Purchases.findById(req.body.id).populate(
      "product.id"
    );

    // Check if productId already exists in the product array
    const existingProductIndex = purchase.product.findIndex(
      (item) => item.id._id.toString() === req.body.productId
    );
    console.log(existingProductIndex);
    if (existingProductIndex === -1) {
      // If productId doesn't exist, push it into the product array
      purchase.product.push({ id: req.body.productId });
    }

    // Save the updated purchase document
    const updatedPurchase = await purchase.save();
    const newProduct = await Purchases.findById(req.body.id).populate(
      "product.id"
    );

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
    const newProduct = await Purchases.findById(req.body.id).populate(
      "product.id"
    );

    res.status(200).json(newProduct);
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeProductInsideInvoice = async(req,res)=>{
  
}
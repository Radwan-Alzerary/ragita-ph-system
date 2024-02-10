//category
const RequestQueue = require("../model/requestQueue"); // Adjust the path as needed
const Product = require("../model/product"); // Adjust the path to your Manufacturer model file
const Costemers = require("../model/constermers"); // Adjust the path as needed
const PaymentType = require("../model/PaymentType"); // Adjust the path as needed
const Storges = require("../model/storge"); // Adjust the path as needed
const Invoice = require("../model/invoice"); // Adjust the path as needed
const Package = require("../model/packing"); // Adjust the path as needed

exports.getAllRequestQueue = async (req, res) => {
  try {
    const requestQueue = await RequestQueue.find();
    res.json(requestQueue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductInsideRequestQueue = async (req, res) => {
  try {
    const requestQueueId = req.params.requestQueueId;
    const requestQueue = await RequestQueue.findById(requestQueueId)
      .populate({
        path: "invoice",
        populate: {
          path: "product.id",
          model: "Product",
          populate: {
            path: "prices.packaging",
          },
        },
      })
      .populate({
        path: "invoice.product.storageType",
        model: "Package",
      });
    if (!requestQueue) {
      return res.status(404).json({ error: "RequestQueue not found" });
    }

    if (requestQueue.invoice.length === 0) {
      return res.json({
        message: "No invoice found in the requestQueue",
        product: [],
      });
    }
    const invoice = requestQueue.invoice[0];
    // console.log(invoice);

    // Create a function to filter prices for a specific storageType
    function filterPrices(product, storageType) {
      console.log(product);
      return product.id.prices.filter(
        (price) => price.packaging._id.toString() === storageType.toString()
      );
    }

    // Map over each product and add a 'pricesWithDefaultPackage' field
    console.log(invoice.product);

    const productsWithPrices = invoice.product.map((product) => {
      const storageType = product.storageType._id.toString();
      // console.log(storageType);
      // console.log(product);
      const pricesWithDefaultPackage = filterPrices(product, storageType);
      return {
        pricesWithDefaultPackage: { pricesWithDefaultPackage, product },
      };
    });
    // console.log(JSON.stringify(productsWithPrices, null, 2));
    res.json({
      message: "Food items retrieved successfully",
      newquantity: invoice.product.quantity,
      product: invoice.product,
      products: productsWithPrices,
      productPrice: "",
      discount: invoice.discount,
      amountPaid: invoice.amountPaid,
      invoiceid: invoice.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.postNewRequestQueue = async (req, res) => {
  const paymentType = await PaymentType.findOne({ name: "نقدي" });
  const storge = await Storges.findOne({ name: "مخزن الادويه" });
  console.log(storge);
  console.log(paymentType);
  const defaultRequestQueue = new RequestQueue({
    number: 1,
    paymentType: paymentType._id,
    storgeType: storge._id,
  });
  defaultRequestQueue
    .save()
    .then(() => {
      console.log("Default RequestQueue created.");
      res.json(defaultRequestQueue);
    })
    .catch((err) => {
      console.error("Error creating RequestQueue :", err);
    });
};

exports.getQueueCostemerValue = async (req, res) => {
  try {
    const requestQueueId = req.params.requestQueueId;
    const requestQueue = await RequestQueue.findById(requestQueueId);
    console.log(requestQueue);
    if (!requestQueue) {
      return res.status(404).json({ error: "RequestQueue not found" });
    }
    res.json(requestQueue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPaymentValue = async (req, res) => {
  try {
    const requestQueueId = req.params.requestQueueId;
    const requestQueue = await RequestQueue.findById(requestQueueId).populate(
      "paymentType"
    );
    console.log(requestQueue);
    if (!requestQueue) {
      return res.status(404).json({ error: "RequestQueue not found" });
    }
    res.json(requestQueue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.costemerCurrentName = async (req, res) => {
  const updateRequestQueue = await RequestQueue.findByIdAndUpdate(req.body.id, {
    currentUserName: req.body.costemersName,
  });
  res.json(updateRequestQueue);
};
exports.storgeUpdate = async (req, res) => {
  const updateRequestQueue = await RequestQueue.findByIdAndUpdate(req.body.id, {
    storgeType: req.body.storgeType,
  });
  res.json(updateRequestQueue);
};
exports.paymentTypeUpdate = async (req, res) => {
  const updateRequestQueue = await RequestQueue.findByIdAndUpdate(req.body.id, {
    paymentType: req.body.paymentType,
  });

  res.json(updateRequestQueue);
};

exports.postFinishRequest = async (req, res) => {
  try {
    let customerId = "";
    const requestQueue = await RequestQueue.findById(req.body.id);
    // Check if customer exists based on the name
    const existingCustomer = await Costemers.findOne({
      name: requestQueue.currentUserName,
    });

    if (existingCustomer) {
      // Customer exists, push the invoiceId to its invoice array
      existingCustomer.invoice.push({ invoiceId: requestQueue.invoice[0] });
      await existingCustomer.save();
      customerId = existingCustomer.id.toString();
      console.log("Invoice added to existing customer");
    } else {
      // Customer does not exist, create a new customer and push the invoiceId
      const newCustomer = new Costemers({
        name: requestQueue.currentUserName,
        phoneNumber: requestQueue.currentUserPhoneNumber,
        invoice: [{ invoiceId: requestQueue.invoice[0] }],
      });
      await newCustomer.save();
      customerId = newCustomer.id.toString();

      console.log("New customer created with invoice");
    }
    const currentInvoice = await Invoice.findById(
      requestQueue.invoice[0]
    ).populate("product");
    for (const product of currentInvoice.product) {
      const updatedProduct = await Product.findById(product.id);
      const selectedPackage = await Package.findById(product.storageType);
      const quantity = product.quantity;
      const result = updatedProduct.prices.find(
        (item) => item.packaging.toString() === product.storageType.toString()
      );

      result.quantity = result.quantity - quantity;
      let parentValue = Math.floor(result.quantity / result.filling);
      let parentId = selectedPackage.parentId;
      let childrenId = selectedPackage.childrenPackage;
      for (i = 0; i < selectedPackage.nestedNum; i++) {
        const package = await Package.findById(parentId);
        const result = updatedProduct.prices.find(
          (item) => item.packaging.toString() === package.id.toString()
        );
        if (!result) {
          continue;
        }
        result.quantity = parentValue;

        parentValue = Math.floor(result.quantity / result.filling);
        parentId = package.parentId;
      }

      let childrenValue = quantity;

      for (i = 0; ; i++) {
        const package = await Package.findById(childrenId);
        if (!package) {
          break;
        }
        const result = updatedProduct.prices.find(
          (item) => item.packaging.toString() === package.id.toString()
        );
        if (!result) {
          continue;
        }
        console.log(childrenValue * result.filling);
        console.log(result.quantity);

        result.quantity = result.quantity - childrenValue * result.filling;
        console.log(result.quantity);

        childrenValue = result.quantity;
        // result.quantity = parentValue
        // parentValue = Math.floor(result.quantity/result.filling)
        childrenId = package.childrenId;
      }
      await updatedProduct.save();
    }
    currentInvoice.type = "مكتمل";
    currentInvoice.paymentType = requestQueue.paymentType;
    currentInvoice.progressdate = Date.now();
    currentInvoice.costemer = customerId;
    currentInvoice.save();
    const paymentType = await PaymentType.findOne({ name: "نقدي" });
    const storge = await Storges.findOne({ name: "مخزن الادويه" });
    const costemers = await Costemers.findOne({ name: "زبون عام" });

    const updatedQueue = await RequestQueue.findByIdAndUpdate(
      req.body.id,
      {
        $set: { invoice: [] },
        paymentType: paymentType.id,
        storge: storge.id,
        currentUserName: costemers.name,
        currentUserPhoneNumber: costemers.phoneNumber,
      },
      { new: true }
    );

    res.json("x");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postCancelRequest = async (req, res) => {
  try {
    let customerId = "";
    const requestQueue = await RequestQueue.findById(req.body.id);
    // Check if customer exists based on the name
    const currentInvoice = await Invoice.findById(requestQueue.invoice[0]);
    currentInvoice.type = "ملغي";
    currentInvoice.save();
    const updatedQueue = await RequestQueue.findByIdAndUpdate(
      req.body.id,
      { $set: { invoice: [] } },
      { new: true }
    );

    res.json("x");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.costemerCurrentNumber = async (req, res) => {
  const updateRequestQueue = await RequestQueue.findByIdAndUpdate(req.body.id, {
    currentUserPhoneNumber: req.body.phoneNumber,
  });
  res.json(updateRequestQueue);
};

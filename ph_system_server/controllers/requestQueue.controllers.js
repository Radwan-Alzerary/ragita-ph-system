//category
const RequestQueue = require("../model/requestQueue"); // Adjust the path as needed
const Product = require("../model/product"); // Adjust the path to your Manufacturer model file
const Costemers = require("../model/constermers"); // Adjust the path as needed
const PaymentType = require("../model/PaymentType"); // Adjust the path as needed
const Storges = require("../model/storge"); // Adjust the path as needed
const Invoice = require("../model/invoice"); // Adjust the path as needed
const Package = require("../model/packing"); // Adjust the path as needed
const { DecreaseAmount } = require("../services/quantityOperations");

exports.getAllRequestQueue = async (req, res) => {
  try {
    const requestQueue = await RequestQueue.find().sort({
      number: 1,
    });
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
          populate: {
            path: "countery",
          },
        },

        populate: {
          path: "product.id",
          model: "Product",
          populate: {
            path: "prices.packaging",
          },
          populate: {
            path: "countery",
          },
        },
      })
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
      // console.log(product);
      return product.id.prices.filter(
        (price) => price.packaging._id.toString() === storageType.toString()
      );
    }

    // Map over each product and add a 'pricesWithDefaultPackage' field
    // console.log(invoice.product);

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
  // Retrieve all numbers in ascending order
  const requests = await RequestQueue.find({}, { number: 1 }).sort({
    number: 1,
  });

  let newNumber = 1;
  if (requests.length > 0) {
    // Find the smallest missing number in the sequence
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].number !== i + 1) {
        newNumber = i + 1;
        break;
      }
      if (i === requests.length - 1) {
        newNumber = requests.length + 1;
      }
    }
  }

  const defaultRequestQueue = new RequestQueue({
    number: newNumber,
    paymentType: paymentType._id,
    storgeType: storge._id,
    currentUserName: "زبون عام",
    currentUserPhoneNumber: "07",
  });
  await defaultRequestQueue
    .save()
    .then(() => {
      console.log("Default RequestQueue created.");
      res.json(defaultRequestQueue);
    })
    .catch((err) => {
      console.error("Error creating RequestQueue :", err);
    });
};

exports.postNewEditQueue = async (req, res) => {
  try {
    // Check if the RequestQueue with the given invoice ID already exists
    const existingQueue = await RequestQueue.findOne({
      invoice: req.body.invoiceId,
    });
    if (existingQueue) {
      // If it exists, return the existing RequestQueue
      return res.json(existingQueue);
    }

    // Find the invoice by ID
    const invoice = await Invoice.findById(req.body.invoiceId).populate(
      "costemer"
    );
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    // Clone the existing invoice and set active to false
    const newInvoiceData = {
      ...invoice.toObject(), // Clone all fields from existingInvoice
      active: false, // Set active to false
      type: "قبل تعديل",
    };

    // Remove _id field to ensure a new _id is generated
    delete newInvoiceData._id;

    // Create a new Invoice instance with modified data
    const newInvoice = new Invoice(newInvoiceData);

    // Save the new invoice to generate a new _id
    const savedInvoice = await newInvoice.save();

    // Get the new invoice ID
    const newInvoiceId = savedInvoice._id;

    // Update the oldInvoice array of the existing invoice
    invoice.oldInvoice.push({
      id: newInvoiceId,
      editDate: new Date(), // or however you want to set the edit date
    });
    await invoice.save();
    // Create a new RequestQueue if none exists
    const requestQueue = new RequestQueue({
      paymentType: invoice.paymentType,
      type: "edit",
      invoice: [req.body.invoiceId],
      currentUserName: invoice.costemer.name,
      currentUserPhoneNumber: invoice.costemer.phoneNumber,

      number: 999,
    });

    // Save the new RequestQueue
    await requestQueue.save();

    // Log the invoice and respond with the new RequestQueue
    // console.log(invoice);
    res.json(requestQueue);
  } catch (error) {
    // Handle errors and respond with a 500 status
    res.status(500).json({ message: error.message });
  }
};

exports.postEditQueueData = async (req, res) => {
  try {
    let customerId = "";
    const requestQueue = await RequestQueue.findById(req.body.id);
    // Check if customer exists based on the name
    const existingCustomer = await Costemers.findOne({
      name: requestQueue.currentUserName,
    });

    if (existingCustomer) {
      // Customer exists, push the invoiceId to its invoice array
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
    const lastOldInvoice = await Invoice.findById(
      currentInvoice.oldInvoice[currentInvoice.oldInvoice.length - 1].id
    ).populate("product");
    const currentInvoiceProduct = currentInvoice.product;
    const oldInvoiceProduct = lastOldInvoice.product;

    // Create an array to hold the final products
    const finalProducts = [];

    // Iterate through old products to initialize final quantities
    oldInvoiceProduct.forEach((oldProduct) => {
      const matchingNewProduct = currentInvoiceProduct.find((newProduct) =>
        newProduct.id.equals(oldProduct.id)
      );
      if (matchingNewProduct) {
        // If there's a matching new product, subtract quantities
        finalProducts.push({
          ...oldProduct.toObject(),
          quantity: oldProduct.quantity - matchingNewProduct.quantity,
        });
      } else {
        // If there's no matching new product, set quantity to negative
        finalProducts.push({
          ...oldProduct.toObject(),
          quantity: -oldProduct.quantity,
        });
      }
    });

    // Iterate through new products to add those not present in old products
    currentInvoiceProduct.forEach((newProduct) => {
      const matchingOldProduct = oldInvoiceProduct.find((oldProduct) =>
        oldProduct.id.equals(newProduct.id)
      );
      if (!matchingOldProduct) {
        // If there's no matching old product, add the new product as is
        finalProducts.push({
          ...newProduct.toObject(),
        });
      }
    });

    // Sanitize finalProducts array to remove Mongoose metadata
    const sanitizedFinalProducts = finalProducts.map((product) => ({
      id: product.id,
      storageType: product.storageType,
      quantity: product.quantity,
      discount: product.discount,
      discountType: product.discountType,
      _id: product._id,
    }));

    for (const product of sanitizedFinalProducts) {
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
      for (let i = 0; i < selectedPackage.nestedNum; i++) {
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
      await updatedProduct.save();
    }

    currentInvoice.type = "مكتمل معدل";
    currentInvoice.paymentType = requestQueue.paymentType;
    currentInvoice.progressdate = Date.now();
    currentInvoice.costemer = customerId;
    await currentInvoice.save();

    await RequestQueue.findByIdAndDelete(req.body.id);

    res.json("x");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getQueueCostemerValue = async (req, res) => {
  try {
    const requestQueueId = req.params.requestQueueId;
    const requestQueue = await RequestQueue.findById(requestQueueId);
    // console.log(requestQueue);
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
    // console.log(requestQueue);
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
     await DecreaseAmount(product);

    }

    currentInvoice.type = "مكتمل";
    currentInvoice.paymentType = requestQueue.paymentType;
    currentInvoice.progressdate = Date.now();
    currentInvoice.costemer = customerId;
    currentInvoice.save();
    const paymentType = await PaymentType.findOne({ name: "نقدي" });
    const storge = await Storges.findOne({ name: "مخزن الادويه" });
    const costemers = await Costemers.findOne({ name: "زبون عام" });

    await RequestQueue.findByIdAndUpdate(
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

exports.postCanceleRequest = async (req, res) => {
  try {
    const requestQueue = await RequestQueue.findById(req.body.id);
    // Check if customer exists based on the name
    const currentInvoice = await Invoice.findById(requestQueue.invoice[0]);
    if (currentInvoice) {
      currentInvoice.type = "ملغي";
      currentInvoice.save();
    }
    await RequestQueue.findByIdAndDelete(req.body.id);

    res.json(currentInvoice);
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

exports.returnProduct = async (req, res) => {
  try {
    const currentInvoice = await Invoice.findById(req.body.invoiceId);
    if (!currentInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    console.log(currentInvoice.returnProduct);
    console.log(req.body.productId);

    // Assuming currentInvoice has an array of products or something similar
    const returnProduct = currentInvoice.product.find(
      (pro) => pro.id.toString() === req.body.productId
    );

    if (!returnProduct) {
      return res.status(404).json({ error: "Product not found in invoice" });
    }
    const checkReturnProduct = currentInvoice.returnProduct.find(
      (pro) => pro.id.toString() === req.body.productId
    );
    returnProduct.quantity -= req.body.returnQuantity;
    const updatedProduct = { ...returnProduct };

    if (checkReturnProduct) {
      checkReturnProduct.quantity += Number(req.body.returnQuantity);
    } else {
      updatedProduct.quantity = req.body.returnQuantity;
      currentInvoice.returnProduct.push({
        id: returnProduct.id,
        price: returnProduct.price,
        quantity: req.body.returnQuantity,
      });
    }
    await currentInvoice.save();
    console.log(returnProduct);

    // Respond with the found product or currentInvoice itself
    res.json(returnProduct); // or res.json(currentInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

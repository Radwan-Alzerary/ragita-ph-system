//category
const Invoice = require("../model/invoice"); // Adjust the path as needed
const Product = require("../model/product"); // Adjust the path as needed
const RequestQueue = require("../model/requestQueue"); // Adjust the path as needed

exports.postNewProduct = async (req, res) => {
  try {
    let existingProductcheck = 0;
    const RequestQueueId = req.body.RequestQueueId;
    const { productId, discountType } = req.body;
    // console.log(productId);
    // console.log(RequestQueueId);
    const requestQueue = await RequestQueue.findById(RequestQueueId);
    if (!requestQueue) {
      return res.status(404).json({ error: "RequestQueue not found" });
    }
    const lastInvoice = await Invoice.findOne().sort({ number: -1 });

    let invoiceNumber;
    if (lastInvoice) {
      // If a previous invoice exists, increment the last invoice number by 1
      invoiceNumber = lastInvoice.number + 1;
    } else {
      // If no previous invoice exists, start with a default value of 1
      invoiceNumber = 1;
    }

    let invoice = null;
    if (requestQueue.invoice.length === 0) {
      // If the requestQueue does not have an invoice, create a new one
      invoice = new Invoice({
        number: invoiceNumber,
        type: "قيد الانتظار", // Replace with the appropriate type
        active: true,
      });
      await invoice.save();
      requestQueue.invoice.push(invoice._id);
      await requestQueue.save();
    } else {
      // If the requestQueue already has an invoice, use the existing one
      invoice = await Invoice.findById(requestQueue.invoice[0]);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
    }
    let updatedproductId = "";

    // Check if the product item already exists in the invoice
    const existingProduct = invoice.product.find(
      (item) => item.id.toString() === productId
    );
    if (existingProduct) {
      const productData = await Product.findById(existingProduct.id);
      updatedproductId = productData.id;
      existingProductcheck = 1;
      // If the product item already exists, increment the quantity by 1
      existingProduct.quantity += 1;
    } else {
      // If the product item doesn't exist, add it to the invoice
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "product not found" });
      }
      const newProduct = {
        id: product._id,
        quantity: 1,
        storageType: product.defaultPackaging,
        discount: 0,
        discountType: discountType || "cash",
      };

      invoice.product.push(newProduct);
    }

    await invoice.save();

    // Get the last added product from the invoice
    const lastAddedProduct = invoice.product[invoice.product.length - 1].id;

    // Populate the last added product
    const populatedProduct = await Product.findById(lastAddedProduct);

    if (existingProductcheck) {
      res.json({
        message: "alredyadd",
        product: populatedProduct,
        newquantity: existingProduct.quantity,
        invoiceId: invoice.id,
        updatedproductId: updatedproductId,
      });
    } else {
      res.json({
        message: "product added to the invoice successfully",
        product: populatedProduct,
        invoiceId: invoice.id,
        newquantity: 1,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.postNewProductByBarcode = async (req, res) => {
  try {
    let existingProductcheck = 0;
    const RequestQueueId = req.body.RequestQueueId;
    const barcode = req.body.barcode;
    const productValue = await Product.findOne({ manufacturBarcode: barcode });
    if (!productValue) {
      res.status(404).json({ error: "" });
    }
    let productId = productValue.id.toString();

    const { discountType } = req.body;
    // console.log(productId);
    // console.log(RequestQueueId);
    const requestQueue = await RequestQueue.findById(RequestQueueId);
    if (!requestQueue) {
      return res.status(404).json({ error: "RequestQueue not found" });
    }
    const lastInvoice = await Invoice.findOne().sort({ number: -1 });

    let invoiceNumber;
    if (lastInvoice) {
      // If a previous invoice exists, increment the last invoice number by 1
      invoiceNumber = lastInvoice.number + 1;
    } else {
      // If no previous invoice exists, start with a default value of 1
      invoiceNumber = 1;
    }

    let invoice = null;
    if (requestQueue.invoice.length === 0) {
      // If the requestQueue does not have an invoice, create a new one
      invoice = new Invoice({
        number: invoiceNumber,
        type: "قيد الانتظار", // Replace with the appropriate type
        active: true,
      });
      await invoice.save();
      requestQueue.invoice.push(invoice._id);
      await requestQueue.save();
    } else {
      // If the requestQueue already has an invoice, use the existing one
      invoice = await Invoice.findById(requestQueue.invoice[0]);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
    }
    let updatedproductId = "";

    // Check if the product item already exists in the invoice
    const existingProduct = invoice.product.find(
      (item) => item.id.toString() === productId
    );
    if (existingProduct) {
      const productData = await Product.findById(existingProduct.id);
      updatedproductId = productData.id;
      existingProductcheck = 1;
      // If the product item already exists, increment the quantity by 1
      existingProduct.quantity += 1;
    } else {
      // If the product item doesn't exist, add it to the invoice
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "product not found" });
      }
      const newProduct = {
        id: product._id,
        quantity: 1,
        storageType: product.defaultPackaging,
        discount: 0,
        discountType: discountType || "cash",
      };

      invoice.product.push(newProduct);
    }

    await invoice.save();

    // Get the last added product from the invoice
    const lastAddedProduct = invoice.product[invoice.product.length - 1].id;

    // Populate the last added product
    const populatedProduct = await Product.findById(lastAddedProduct);

    if (existingProductcheck) {
      res.json({
        message: "alredyadd",
        product: populatedProduct,
        newquantity: existingProduct.quantity,
        invoiceId: invoice.id,
        updatedproductId: updatedproductId,
      });
    } else {
      res.json({
        message: "product added to the invoice successfully",
        product: populatedProduct,
        invoiceId: invoice.id,
        newquantity: 1,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.removeProductInside = async (req, res) => {
  try {
    const requestQueue = await RequestQueue.findById(req.params.requestQueueId);
    if (!requestQueue) {
      return res.status(404).json({ error: "RequestQueue not found" });
    }
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      requestQueue.invoice[0],
      {
        $pull: { product: { id: req.params.productId } },
      },
      { new: true }
    );
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Product removed from the invoice", updatedInvoice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateProductQuantity = async (req, res) => {
  try {
    const requestQueueId = req.body.RequestQueueId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    // console.log(requestQueueId);

    const requestQueue = await RequestQueue.findById(requestQueueId);
    if (!requestQueue) {
      return res.status(404).json({ error: "requestQueue not found" });
    }
    let invoice = await Invoice.findById(requestQueue.invoice[0]);

    const productItem = invoice.product.find(
      (item) => item.id.toString() === productId
    );

    if (!productItem) {
      return res
        .status(404)
        .json({ error: "Food item not found in the invoice." });
    }
    // console.log(foodItem)
    productItem.quantity = quantity;

    // Save the updated invoice
    await invoice.save();
    res.json({
      message: "quantity changed",
      product: productItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.updateProductPackage = async (req, res) => {
  try {
    const requestQueueId = req.body.RequestQueueId;
    const productId = req.body.productId;
    const packageId = req.body.packageId;
    // console.log(req.body);

    const requestQueue = await RequestQueue.findById(requestQueueId);
    if (!requestQueue) {
      return res.status(404).json({ error: "requestQueue not found" });
    }
    let invoice = await Invoice.findById(requestQueue.invoice[0]);

    const productItem = invoice.product.find(
      (item) => item.id.toString() === productId
    );

    if (!productItem) {
      return res
        .status(404)
        .json({ error: "Food item not found in the invoice." });
    }
    // console.log(productItem.storageType);
    productItem.storageType = packageId;

    // Save the updated invoice
    await invoice.save();
    res.json({
      message: "packageId changed",
      product: productItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.updateInvoicePaymentType = async (req, res) => {
  const RequestQueueId = req.body.RequestQueueId;

  const requestQueue = await RequestQueue.findById(RequestQueueId);
  if (!requestQueue) {
    return res.status(404).json({ error: "RequestQueue not found" });
  }
  const invoice = await Invoice.findById(requestQueue.invoice[0].toString());

  const updateInvoice = await Invoice.findByIdAndUpdate(
    requestQueue.invoice[0].toString(),
    {
      discount: req.body.discount,
      finalprice: invoice.fullPrice - req.body.discount,
    },
    { new: true } // Set this option to true
  );

  res.json(updateInvoice);
};

exports.updateInvoiceDiscount = async (req, res) => {
  const RequestQueueId = req.body.RequestQueueId;

  const requestQueue = await RequestQueue.findById(RequestQueueId);
  if (!requestQueue) {
    return res.status(404).json({ error: "RequestQueue not found" });
  }
  if (requestQueue.invoice[0]) {
    const invoice = await Invoice.findById(requestQueue.invoice[0].toString());

    const updateInvoice = await Invoice.findByIdAndUpdate(
      requestQueue.invoice[0].toString(),
      {
        discount: req.body.discount,
        finalprice: invoice.fullPrice - req.body.discount,
      },
      { new: true } // Set this option to true
    );

    res.json(updateInvoice);
  } else {
    res.json("no");
  }
};
exports.updateInvoiceAmountPaid = async (req, res) => {
  const RequestQueueId = req.body.RequestQueueId;
  const requestQueue = await RequestQueue.findById(RequestQueueId);
  if (!requestQueue) {
    return res.status(404).json({ error: "RequestQueue not found" });
  }
  if (requestQueue.invoice[0]) {
    const updateInvoice = await Invoice.findByIdAndUpdate(
      requestQueue.invoice[0].toString(),
      { amountPaid: req.body.amountPaid },
      { new: true } // Set this option to true
    );

    res.json(updateInvoice);
  }else{
    res.json("no");

  }
};
exports.updateInvoiceFullPrice = async (req, res) => {
  const RequestQueueId = req.body.RequestQueueId;
  const requestQueue = await RequestQueue.findById(RequestQueueId);

  if (!requestQueue) {
    return res.status(404).json({ error: "RequestQueue not found" });
  }

  // Check if requestQueue.invoice exists and is an array
  if (
    !Array.isArray(requestQueue.invoice) ||
    requestQueue.invoice.length === 0
  ) {
    return res.status(404).json({ error: "Invoice not found in RequestQueue" });
  }

  const invoiceId = requestQueue.invoice[0].toString();
  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }

  const finalprice = req.body.fullPrice - invoice.discount;
  const updateInvoice = await Invoice.findByIdAndUpdate(
    invoiceId,
    { fullPrice: req.body.fullPrice, finalprice: finalprice },
    { new: true } // Set this option to true
  );

  res.json(updateInvoice);
};
exports.getPrice = async (req, res) => {
  const RequestQueueId = req.body.RequestQueueId;
  const requestQueue = await RequestQueue.findById(RequestQueueId);
  if (!requestQueue) {
    return res.status(404).json({ error: "RequestQueue not found" });
  }
  const invoice = await Invoice.findById(requestQueue.invoice[0].toString());
  res.json(invoice);
};
exports.returnItems = async (req, res) => {};
exports.deleteProductInsideInvoice = async (req, res) => {
  try {
    // Use the `updateOne` method to update the document
    // console.log(req.body);
    const updatedDocument = await Invoice.updateOne(
      { _id: req.body.id },
      { $pull: { product: { id: req.body.hederlineid } } }
    );

    res.json({ message: "Element removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("costemer")
      .populate("paymentType")
      .sort({ updatedAt: "desc" });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOneInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.findById();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editOneInvoice = async (req, res) => {
  try {
    res.json("costemers");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.patchDiscountInsideInvoice = async (req, res) => {};
exports.getInvoice = async (req, res) => {};

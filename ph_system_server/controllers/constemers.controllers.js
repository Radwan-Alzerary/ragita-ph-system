//category
const PaymentType = require("../model/PaymentType");
const Costemers = require("../model/constermers"); // Adjust the path as needed

exports.getAllCostemes = async (req, res) => {
  try {
    const costemers = await Costemers.find();
    res.json(costemers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCostemesWithDepts = async (req, res) => {
  try {
    const paymentType = await PaymentType.findOne({ name: "اجل" });
    console.log(paymentType.id);
    const customers = await Costemers.find()
      .populate({
        path: "invoice.invoiceId",
        match: { paymentType: paymentType.id }, // This will filter invoices of type 'اجل'
      })
      .exec();

    // Filter out customers who have at least one invoice with invoiceId
    const customersWithAglInvoices = customers.filter((customer) =>
      customer.invoice.some((invoice) => invoice.invoiceId)
    );

    // Modify invoices to only include those with invoiceId !== null
    customersWithAglInvoices.forEach((customer) => {
      customer.invoice = customer.invoice.filter(
        (invoice) => invoice.invoiceId !== null
      );
    });

    // Filter out customers with the name "زبون عام"
    const filteredCustomers = customersWithAglInvoices.filter(
      (customer) => customer.name !== "زبون عام"
    );

    res.json(filteredCustomers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.debtPayment = async (req, res) => {
  const { customerId, amount } = req.body;
  console.log(customerId, amount);

  try {
    const customer = await Costemers.findById(customerId).populate(
      "invoice.invoiceId"
    );
    const cashPaymentType = await PaymentType.findOne({ name: "نقدي" });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let remainingAmount = amount;

    // Sort invoices by date (assuming there's a date field in your invoices)
    customer.invoice.sort(
      (a, b) =>
        new Date(a.invoiceId.createdAt) - new Date(b.invoiceId.createdAt)
    );

    for (const invoiceEntry of customer.invoice) {
      const invoice = invoiceEntry.invoiceId;
      const dueAmount = invoice.finalprice - invoice.amountPaid;
      if (dueAmount === 0 || dueAmount - amount === 0) {
        invoice.paymentType = cashPaymentType.id;
        await invoice.save();
      }

      // Log only the invoices with the target payment type
      if (invoice.paymentType.toString() === cashPaymentType.id) {
        console.log("fuck");
        continue;
      }

      if (dueAmount > 0) {
        if (dueAmount >= remainingAmount) {
          invoice.amountPaid += remainingAmount;
          remainingAmount = 0;
          await invoice.save();
          break;
        } else {
          remainingAmount -= dueAmount;
          invoice.amountPaid = invoice.finalprice;
          await invoice.save();
        }
      }
      console.log(invoice.amountPaid === invoice.finalprice);
      if (invoice.amountPaid === invoice.finalprice) {
        invoice.paymentType = cashPaymentType.id;
        await invoice.save();
      }
    }
    await customer.save();

    if (remainingAmount > 0) {
      return res.status(200).json({
        message: `Payment applied. Remaining amount: ${remainingAmount}`,
      });
    }

    res.status(200).json({ message: "Payment applied successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

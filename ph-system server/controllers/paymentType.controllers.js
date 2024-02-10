//category
const PaymentType = require("../model/PaymentType"); // Adjust the path as needed

exports.getAllPaymentType = async (req, res) => {
  try {
    const paymentType = await PaymentType.find();
    res.json(paymentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

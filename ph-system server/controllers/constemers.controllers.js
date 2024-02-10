//category
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
    const costemers = await Costemers.find().populate("invoice");
    res.json(costemers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

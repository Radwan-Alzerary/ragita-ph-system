const Storges = require("../model/storge"); // Adjust the path as needed

exports.getStorge = async (req, res) => {};

exports.getAllStorge = async (req, res) => {
  try {
    const storges = await Storges.find();
    res.json(storges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addStorge = async (req, res) => {};

exports.deleteStorge = async (req, res) => {};

exports.editStorge = async (req, res) => {};

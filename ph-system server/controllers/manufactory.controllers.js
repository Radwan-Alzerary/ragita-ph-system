//category
const Manufactor = require("../model/manufactor"); // Adjust the path as needed

exports.getOneManufactiry= async (req, res) => {};

exports.getAllManufactor = async (req, res) => {
  try {
    const manumanufactor = await Manufactor.find();
    res.json(manumanufactor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    company: req.body.company,
    program: req.body.program,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      res.json({ message: "Category deleted" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
    
};

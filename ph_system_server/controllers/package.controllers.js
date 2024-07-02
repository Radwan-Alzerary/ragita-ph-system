const Package = require("../model/packing"); // Adjust the path as needed
async function getPackageAndChildren(packageId) {
  const package = await Package.findById(packageId).exec();
  if (!package) {
    return null; // Package not found
  }

  // Recursively fetch children packages
  const children = await Promise.all(
    package.childrenPackage.map((childId) => getPackageAndChildren(childId))
  );

  return {
    name: package.name,
    id: package.id,
    fillings: package.fillings,
    active: package.active,
    children: children.filter((child) => child !== null), // Filter out null (for not found children)
  };
}

// Function to retrieve all packages with nestedNum = 0 and build the nested structure for each
async function getRootPackagesAndChildren() {
  const rootPackages = await Package.find({ nestedNum: 0 }).exec();

  const nestedStructures = await Promise.all(
    rootPackages.map((rootPackage) => getPackageAndChildren(rootPackage._id))
  );

  return nestedStructures.filter((structure) => structure !== null); // Filter out null (for not found root packages)
}

async function getRootPackagesAndChildrenFromId(packageId) {
  const rootPackages = await Package.find({ _id: packageId }).exec();

  const nestedStructures = await Promise.all(
    rootPackages.map((rootPackage) => getPackageAndChildren(rootPackage._id))
  );

  return nestedStructures.filter((structure) => structure !== null); // Filter out null (for not found root packages)
}

exports.getAllPackage = async (req, res) => {
  try {
    const nestedStructures = await getRootPackagesAndChildren();
    if (nestedStructures.length > 0) {
      res.json(nestedStructures);
    } else {
      res
        .status(404)
        .json({ message: "No root packages with nestedNum = 0 found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getNestedFromPackageId = async (req, res) => {
  const pacakgeId = req.params.parentId;
  try {
    const nestedStructures = await getRootPackagesAndChildrenFromId(pacakgeId);
    if (nestedStructures.length > 0) {
      res.json(nestedStructures);
    } else {
      res
        .status(404)
        .json({ message: "No root packages with nestedNum = 0 found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllPackageName = async (req, res) => {
  try {
    const rootPackages = await Package.find({active:true}).exec();
    if (rootPackages.length > 0) {
      res.json(rootPackages);
    } else {
      res
        .status(404)
        .json({ message: "No root packages with nestedNum = 0 found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const package = await Package.findById(packageId).populate("childrenPackage").exec();
    
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json(package);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve package" });
  }
};

exports.addParentPackage = async (req, res) => {
  console.log(req.body);
  const package = new Package({
    name: req.body.name,
    nestedNum: 0,
    isNested: false,
    fillings: 1,
  });

  try {
    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPackageFillingForChild = async (req, res) => {
  try {
    const id = req.body.id;

    let totall = 1;
    const array = [];
    // Find the package with the provided ID
    const package = await Package.findById(id).exec();
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }
    let parentId = "";
    const getParentId = async (id) => {
      const package = await Package.findById(id).exec();
      if (!req.body.currentPackage[package.parentId]) {
        return id;
      }
      if (!package.parentId) {
        return package._id;
      }
      return getParentId(package.parentId);
    };
    if (package.parentId) {
      parentId = await getParentId(id);
    } else {
      parentId = id;
    }

    let nestedNumber = 0;
    // Recursive function to calculate total filling value
    const calculateTotalFilling = async (pkgId) => {
      const pkg = await Package.findById(pkgId).exec();

      if (!pkg) {
        return { id: pkgId, totalFilling: 0 };
      }

      let totalFilling;
      totall = totall * req.body.currentPackage[pkgId].packagingValue;
      pkg.total = totall;

      // console.log(parseInt(req.body.currentPackage[pkgId].packagingValue));
      if (nestedNumber === 0) {
        totalFilling = req.body.fillingValue;
      } else {
        totalFilling =
          parseInt(req.body.currentPackage[pkgId].packagingValue) ||
          pkg.fillings;
      }
      nestedNumber++;

      // Iterate over child packages and calculate their total filling value
      for (const childId of pkg.childrenPackage) {
        const childResult = await calculateTotalFilling(childId);
        // array.push(childResult)
        // childResults.push(childResult);
      }
      array.push({ id: pkgId, name: pkg.name, totall: pkg.total });

      return { id: pkgId, name: pkg.name, totall: pkg.total };
    };
    // Calculate the total filling value for the given package
    const result = await calculateTotalFilling(parentId);

    result.childFill = array;
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addNestedPackage = async (req, res) => {
  const parentId = req.params.parentId;
  console.log(parentId);
  try {
    const parentPackage = await Package.findById(parentId)
      .populate("childrenPackage")
      .exec();

    if (!parentPackage) {
      return res.status(404).json({ error: "Parent Package not found" });
    }

    const nestedPackage = new Package({
      name: req.body.name,
      nestedNum: parentPackage.nestedNum + 1,
      isNested: true,
      fillings: req.body.fillings,
      parentId: parentId,
    });
    parentPackage.childrenPackage.push(nestedPackage);

    // Save both the parent and the nested package
    await Promise.all([nestedPackage.save(), parentPackage.save()]);
    res.status(201).json(nestedPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve or create package" });
  }
};

exports.editPackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.packageId,
      req.body,
      { new: true }
    );
    if (updatedPackage) {
      res.json(updatedPackage);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePackage = async (req, res) => {
  const packageId = req.params.packageId;

  try {
    // Find the package to be deleted
    const deletedPackage = await Package.findById(packageId);
    deletedPackage.active = false;
    await deletedPackage.save();

    res.json("done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
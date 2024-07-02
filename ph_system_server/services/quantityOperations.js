const Package = require("../model/packing");
const Product = require("../model/product");

async function increasesQuantity(product) {
  const updatedProduct = await Product.findById(product.id);
  if (!updatedProduct) throw new Error("Product not found");

  const selectedPackage = await Package.findById(product.storageType);
  if (!selectedPackage) throw new Error("Selected package not found");

  const quantity = product.quantity;
  const priceItem = updatedProduct.prices.find(
    (item) => item.packaging.toString() === product.storageType.toString()
  );

  if (!priceItem) throw new Error("Price item not found");

  priceItem.quantity += quantity;

  let parentValue = Math.floor(priceItem.quantity / priceItem.filling);
  let parentId = selectedPackage.parentId;

  for (let i = 0; i < selectedPackage.nestedNum && parentId; i++) {
    const parentPackage = await Package.findById(parentId);
    if (!parentPackage) break;

    const parentPriceItem = updatedProduct.prices.find(
      (item) => item.packaging.toString() === parentPackage.id.toString()
    );

    if (parentPriceItem) {
      parentPriceItem.quantity = parentValue;
      parentValue = Math.floor(
        parentPriceItem.quantity / parentPriceItem.filling
      );
    }

    parentId = parentPackage.parentId;
  }

  let childrenValue = quantity;
  let childrenId = selectedPackage.childrenPackage;

  while (childrenId) {
    const childPackage = await Package.findById(childrenId);
    if (!childPackage) break;

    const childPriceItem = updatedProduct.prices.find(
      (item) => item.packaging.toString() === childPackage.id.toString()
    );

    if (childPriceItem) {
      childPriceItem.quantity += childrenValue * childPriceItem.filling;
      childrenValue = childPriceItem.quantity;
    }

    childrenId = childPackage.childrenPackage;
  }

  await updatedProduct.save();
}
async function DecreaseAmount(product) {
    const updatedProduct = await Product.findById(product.id);
    if (!updatedProduct) throw new Error("Product not found");
  
    const selectedPackage = await Package.findById(product.storageType);
    if (!selectedPackage) throw new Error("Selected package not found");
  
    const quantity = product.quantity;
    const priceItem = updatedProduct.prices.find(
      (item) => item.packaging.toString() === product.storageType.toString()
    );
  
    if (!priceItem) throw new Error("Price item not found");
  
    // Ensure we don't go below zero quantity
    // if (priceItem.quantity < quantity) {
    //   throw new Error("Not enough stock to decrease");
    // }
  
    priceItem.quantity -= quantity;
  
    let parentValue = Math.floor(priceItem.quantity / priceItem.filling);
    let parentId = selectedPackage.parentId;
  
    // Updating parent quantities
    while (parentId) {
      const parentPackage = await Package.findById(parentId);
      if (!parentPackage) break;
  
      const parentPriceItem = updatedProduct.prices.find(
        (item) => item.packaging.toString() === parentPackage.id.toString()
      );
  
      if (parentPriceItem) {
        parentPriceItem.quantity = parentValue;
        parentValue = Math.floor(
          parentPriceItem.quantity / parentPriceItem.filling
        );
      }
  
      parentId = parentPackage.parentId;
    }
  
    let childrenValue = quantity;
    let childrenId = selectedPackage.childrenPackage;
  
    // Updating children quantities
    while (childrenId) {
      const childPackage = await Package.findById(childrenId);
      if (!childPackage) break;
  
      const childPriceItem = updatedProduct.prices.find(
        (item) => item.packaging.toString() === childPackage.id.toString()
      );
  
      if (childPriceItem) {
        childPriceItem.quantity -= childrenValue * childPriceItem.filling;
        // if (childPriceItem.quantity < 0) {
        //   throw new Error("Quantity inconsistency in child package");
        // }
        childrenValue = childPriceItem.quantity;
      }
  
      childrenId = childPackage.childrenPackage;
    }
  
    await updatedProduct.save();
  }
  module.exports = { increasesQuantity, DecreaseAmount };

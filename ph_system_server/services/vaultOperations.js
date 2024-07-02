// services/vaultOperations.js
const Vault = require("../model/vault")
const Transaction = require("../model/vault_transactions")
async function addVault(name, openingBalance) {
  const newVault = new Vault({
    name,
    opening_balance: openingBalance,
    current_balance: openingBalance
  });
  await newVault.save();
  console.log(`New vault created with the following id: ${newVault._id}`);
}

async function addDeposit(vaultId, amount, description) {
  const newTransaction = new Transaction({
    vault_id: vaultId,
    transaction_type: 'deposit',
    amount,
    description
  });

  await newTransaction.save();

  // Update vault's current balance
  await Vault.findByIdAndUpdate(vaultId, { $inc: { current_balance: amount } });

  console.log(`Deposit of ${amount} added to vault ${vaultId}`);
}

async function addWithdrawal(vaultId, amount, description) {
  const newTransaction = new Transaction({
    vault_id: vaultId,
    transaction_type: 'withdrawal',
    amount,
    description
  });

  await newTransaction.save();

  // Update vault's current balance
  await Vault.findByIdAndUpdate(vaultId, { $inc: { current_balance: -amount } });

  console.log(`Withdrawal of ${amount} made from vault ${vaultId}`);
}

async function initializeVault() {
    const existingVault = await Vault.findOne({ name: 'Main Vault' });
  
    if (!existingVault) {
      await addVault('Main Vault', 0); // Create a new vault if it doesn't exist
    } else {
      console.log('Main Vault already exists. Skipping initialization.');
    }
  }
  
  
module.exports = { addVault, addDeposit, addWithdrawal ,initializeVault};

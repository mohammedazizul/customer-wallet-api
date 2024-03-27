const Wallet = require('../models/wallet');

const updateWallet = async (req, res) => {

    const allowedParams = ['action', 'amount'];
    const allowedActionValue = ['add', 'deduct'];

    if (!req.params) {
        return res.status(400).json({ error: "Invalid request data." });
    }

    const { customerId } = req.params;

    if (!req.body) {
        return res.status(400).json({ error: "Invalid wallet data." });
    }

    const missingParams = allowedParams.filter(param => !req.body.hasOwnProperty(param));

    if (missingParams.length > 0) {
        return res.status(400).json({ error: `Missing required parameters: ${missingParams.join(', ')}` });
    }

    const walletActionTodo = req.body;

    if (!walletActionTodo.amount || isNaN(walletActionTodo.amount) || walletActionTodo.amount < 0 || walletActionTodo.amount === 0) {
        return res.status(400).json({ error: 'Invalid amount request format' });
    }

    if (!allowedActionValue.includes(walletActionTodo.action)) {
        return res.status(400).json({ error: 'Invalid action request format' });
    }

    try {
        let oldBalance = 0;
        let newBalance = 0;

        const oldWalletData = await Wallet.getCustomerWalletBalance(customerId);

        if (oldWalletData.message === "Customer wallet balance retrieved successfully!") {
            oldBalance = parseFloat(oldWalletData.data.balance);
        } else if (oldWalletData.message === "Customer wallet not found!") {
            return res.status(404).json({ error: "Customer wallet not found!" });
        } else {
            return res.status(404).json({ error: "Something went wrong, please try again." });
        }

        if (walletActionTodo.action === 'add') {
            newBalance = parseFloat(oldBalance) + parseFloat(walletActionTodo.amount);
        } else if (walletActionTodo.action === 'deduct') {
            if (oldBalance < walletActionTodo.amount) {
                return res.status(400).json({ error: 'Insufficient funds' });
            } else {
                newBalance = parseFloat(oldBalance) - parseFloat(walletActionTodo.amount);
            }
        }

        const customer = await Wallet.updateWallet(customerId, parseFloat(newBalance));

        if (customer.message === "Customer wallet updated successfully!") {
            return res.status(200).json({
                message: "Customer wallet updated successfully.",
                data: {
                    customerId: customer.data.customerId,
                    balance: parseFloat(newBalance).toFixed(2)
                }
            });
        } else {
            return res.status(404).json({ error: "Something went wrong, please try again." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    updateWallet,
};
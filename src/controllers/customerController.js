const Customer = require('../models/customer');
const Wallet = require('../models/wallet');

const createCustomer = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ error: "Invalid customer data." });
    }

    const { firstName, lastName, address } = req.body;

    if (!firstName) {
        return res.status(400).json({ error: "Invalid customer first name." });
    }

    if (!lastName) {
        return res.status(400).json({ error: "Invalid customer last name." });
    }

    if (!address) {
        return res.status(400).json({ error: "Invalid customer address." });
    }

    let isCustomerCreated = false;
    let isWalletCreated = false;
    let customerId = null;

    try {
        const customerData = {
            firstName, lastName, address
        }

        const customer = await Customer.createCustomer(customerData);

        if (customer.data.customerId) {
            isCustomerCreated = true;
            customerId = customer.data.customerId;
            const wallet = await Wallet.createWallet(customerId);
            if (wallet.data.walletId) {
                isWalletCreated = true;
            } else {
                await Customer.deleteCustomer(customerId);
            }
        }

        if (isCustomerCreated && isWalletCreated) {
            return res.status(200).json({
                message: "Customer and wallet created successfully.",
                data: {
                    customerId: customer.data.customerId,
                }
            });
        } else {
            return res.status(404).json({ error: "Something went wrong, please try again." });
        }
    } catch (error) {
        console.error(error);
        if (isCustomerCreated) {
            await Customer.deleteCustomer(customerId);
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllCustomers = async (req, res) => {

    try {
        const customers = await Customer.getAllCustomers();

        if (customers.data.length && customers.data.length > 0) {
            return res.status(200).json({
                message: "Customer(s) retrieved successfully.",
                data: {
                    customers: customers.data,
                }
            });
        } else if (customers.data.length === 0) {
            return res.status(200).json({
                message: "No customer(s) found.",
                data: {
                    customers: [],
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

const deleteCustomer = async (req, res) => {

    if (!req.params) {
        return res.status(400).json({ error: "Invalid request data." });
    }

    const { customerId } = req.params;

    if (!customerId) {
        return res.status(400).json({ error: "Invalid customer id." });
    }

    let isCustomerDeleted = false;
    let isWalletDeleted = false;

    try {
        const customer = await Customer.softDeleteCustomer(customerId);

        if (customer.message === "Customer soft deleted Successfully!") {
            isCustomerDeleted = true;

            const wallet = await Wallet.softDeleteWallet(customerId);

            if (wallet.message === "Wallet soft deleted successfully!") {
                isWalletDeleted = true;
            }
        }

        if (isCustomerDeleted && isWalletDeleted) {
            return res.status(200).json({
                message: "Customer and wallet deleted successfully.",
                data: {}
            });
        } else {
            await Customer.revertSoftDeleteCustomer(customerId);
            await Wallet.revertSoftDeleteWallet(customerId)
            return res.status(404).json({ error: "Something went wrong, please try again." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    deleteCustomer,
};
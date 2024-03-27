const pool = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const createWallet = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        const walletData = {
            customer_id: customerId,
            id: uuidv4(),
        };

        let postQuery = `INSERT INTO wallets SET ?`;

        try {
            pool.query(postQuery, walletData, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Wallet created successfully!",
                            data: {
                                walletId: walletData.id,
                            }
                        });
                    } else {
                        reject("SQL_ERROR");
                    }
                }
            });
        } catch (error) {
            console.log(error);
            reject("SQL_ERROR");
        }
    })
}

const softDeleteWallet = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let updateQuery = `UPDATE wallets SET deleted_at = CURRENT_TIMESTAMP  WHERE customer_id = ?`;

        try {
            pool.query(updateQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Wallet soft deleted successfully!",
                            data: {
                                customerId,
                            }
                        });
                    } else {
                        reject("SQL_ERROR");
                    }
                }
            });
        } catch (error) {
            console.log(error);
            reject("SQL_ERROR");
        }
    })
}

const revertSoftDeleteWallet = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let updateQuery = `UPDATE wallets SET deleted_at = null  WHERE customer_id = ?`;

        try {
            pool.query(updateQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Wallet updated successfully!",
                            data: {
                                customerId,
                            }
                        });
                    } else {
                        reject("SQL_ERROR");
                    }
                }
            });
        } catch (error) {
            console.log(error);
            reject("SQL_ERROR");
        }
    })
}

const getCustomerWalletBalance = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let getQuery = `SELECT balance FROM wallets WHERE customer_id = ?`;

        try {
            pool.query(getQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.length > 0) {
                        resolve({
                            message: "Customer wallet balance retrieved successfully!",
                            data: result[0],
                        });
                    } else if (result.length === 0) {
                        resolve({
                            message: "Customer wallet not found!",
                            data: [],
                        });
                    } else {
                        reject("SQL_ERROR");
                    }
                }
            });
        } catch (error) {
            console.log(error);
            reject("SQL_ERROR");
        }
    })
}

const updateWallet = async (customerId, newBalance) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let updateQuery = `UPDATE wallets SET balance = ?  WHERE customer_id = ?`;

        try {
            pool.query(updateQuery, [newBalance, customerId], (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Customer wallet updated successfully!",
                            data: {
                                customerId,
                            }
                        });
                    } else {
                        reject("SQL_ERROR");
                    }
                }
            });
        } catch (error) {
            console.log(error);
            reject("SQL_ERROR");
        }
    })
}

module.exports = {
    createWallet,
    updateWallet,
    softDeleteWallet,
    revertSoftDeleteWallet,
    getCustomerWalletBalance,
};

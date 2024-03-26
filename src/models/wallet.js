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

module.exports = {
    createWallet
};

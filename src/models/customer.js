const pool = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const createCustomer = async (customer) => {

    if (!customer || Object.keys(customer).length === 0) {
        return Promise.reject("Invalid param");
    }

    if (!customer.firstName) {
        return res.status(400).json({ error: "Missing param customer first name." });
    }

    if (!customer.lastName) {
        return res.status(400).json({ error: "Missing param  customer last name." });
    }

    if (!customer.address) {
        return res.status(400).json({ error: "Missing param  customer address." });
    }

    return new Promise((resolve, reject) => {

        const customerData = {
            first_name: customer.firstName,
            last_name: customer.lastName,
            full_address: customer.address,
            id: uuidv4(),
        };

        let postQuery = `INSERT INTO customers SET ?`;

        try {
            pool.query(postQuery, customerData, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Customer created successfully!",
                            data: {
                                customerId: customerData.id,
                            }
                        });
                    } else {
                        reject("SQL_ERROR");
                    }
                }
            });
        } catch (error) {
            console.log(error);
            reject("ERROR");
        }
    })
}

const deleteCustomer = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let postQuery = `DELETE FROM customers WHERE id = ?`;

        try {
            pool.query(postQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Customer deleted successfully!",
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

const getAllCustomers = async () => {

    return new Promise((resolve, reject) => {

        let getQuery = `
            SELECT 
                c.id, c.first_name, c.last_name, c.full_address, w.balance
            FROM 
                customers c
            LEFT JOIN 
                wallets w 
            ON 
                c.id = w.customer_id 
            WHERE 
                c.deleted_at IS NULL 
            AND 
                w.deleted_at IS NULL
        `;

        try {
            pool.query(getQuery, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.length > 0) {
                        resolve({
                            message: "Customer(s) retrieved successfully!",
                            data: result
                        });
                    } else if (result.length === 0) {
                        resolve({
                            message: "No customer(s) found!",
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

const softDeleteCustomer = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let updateQuery = `UPDATE customers SET deleted_at = CURRENT_TIMESTAMP  WHERE id = ?`;

        try {
            pool.query(updateQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Customer soft deleted Successfully!",
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

const revertSoftDeleteCustomer = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let updateQuery = `UPDATE customers SET deleted_at = null  WHERE id = ?`;

        try {
            pool.query(updateQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Customer updated successfully!",
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
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    softDeleteCustomer,
    revertSoftDeleteCustomer,
};

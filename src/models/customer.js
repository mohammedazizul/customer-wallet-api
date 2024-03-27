const { v4: uuidv4 } = require('uuid');
const pool = require('../../config/database');

const createCustomer = async (customer) => {

    if (!customer || Object.keys(customer).length === 0) {
        return Promise.reject("Invalid param");
    }

    if (!customer.first_name) {
        return res.status(400).json({ error: "Missing param customer first name." });
    }

    if (!customer.last_name) {
        return res.status(400).json({ error: "Missing param  customer last name." });
    }

    if (!customer.full_address) {
        return res.status(400).json({ error: "Missing param  customer full address." });
    }

    return new Promise((resolve, reject) => {

        const customerData = {
            ...customer,
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

const getCustomerById = async (customerId) => {

    if (!customerId) {
        return Promise.reject("Missing param customer id.");
    }

    return new Promise((resolve, reject) => {

        let updateQuery = `SELECT * FROM customers WHERE id = ?`;

        try {
            pool.query(updateQuery, customerId, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.length > 0) {
                        resolve({
                            message: "Customer retrieved Successfully!",
                            data: result[0],
                        });
                    } else if (result.length === 0) {
                        resolve({
                            message: "Customer not found!",
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

const updateCustomer = async (customerId, newCustomer) => {

    if (!customerId) {
        return res.status(400).json({ error: "Missing param customer id" });
    }

    if (!newCustomer || Object.keys(newCustomer).length === 0) {
        return Promise.reject("Invalid customer param");
    }

    return new Promise(async (resolve, reject) => {

        const oldCustomerData = await getCustomerById(customerId);

        if(oldCustomerData.message === "Customer not found!") {
            resolve({
                message: "Customer not found!",
                data: {
                    customerId,
                }
            });
        }

        const updatedCustomerData = {
            ...oldCustomerData.data,
            ...newCustomer,
        };

        let postQuery = `UPDATE customers SET ? WHERE id = ?`;

        try {
            pool.query(postQuery, [updatedCustomerData, customerId], (error, result) => {
                if (error) {
                    console.log(error);
                    reject("SQL_ERROR");
                } else if (result) {
                    if (result.affectedRows > 0) {
                        resolve({
                            message: "Customer updated successfully!",
                            data: {
                                customerId: customerId,
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

module.exports = {
    createCustomer,
    deleteCustomer,
    updateCustomer,
    getAllCustomers,
    softDeleteCustomer,
    revertSoftDeleteCustomer,
};

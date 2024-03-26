const config = require('../config/config');

const authMiddleware = (req, res, next) => {

    const { headers, path } = req;

    if (!path.startsWith('/api')) {
        return res.status(403).json({ error: "Invalid request" });
    } else if (headers['x-access-token'] && headers['x-access-token'] === config.apiKey) {
        return next();
    } else {
        console.log("BLOCKED: Unauthorized")
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authMiddleware;
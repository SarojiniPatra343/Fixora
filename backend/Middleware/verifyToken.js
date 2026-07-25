const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({
            message: "No Token Provided"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("JWT ERROR:", err.message);

        return res.status(403).json({
            message: "Invalid Token"
        });
    }
};

module.exports = verifyToken;
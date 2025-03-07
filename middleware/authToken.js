// middleware.js 

// imports
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
import { config } from 'dotenv'
config()

// middleware functions

// authenticate token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    if (!authHeader) return res.status(401).json({ error: "Access denied, no token provided" });

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) return res.status(401).json({ error: "Malformed token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("JWT Verification Failed:", err.message);
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    });
};
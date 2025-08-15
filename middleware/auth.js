const jwt = require('jsonwebtoken');
const Admin = require('../modals/adminSchema');

const userAuth = async (req, res, next) => {
    try {
        // Read cookie from request
        const {token} = req.cookies
        console.log("token:", token);

        // if (!token) {
        //     return res.status(401).json({ message: "Token not provided" });
        // }

        // Verify token
        const decodedToken = jwt.verify(token, "ONLYUSERS");
        console.log("decodedToken:", decodedToken);
        const {email} = decodedToken; 

        // Find user in DB
        const user = await Admin.findOne({email : email});
        // console.log(user)
        console.log("user:", user);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

module.exports = { userAuth };

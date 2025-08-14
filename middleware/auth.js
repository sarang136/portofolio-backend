const jwt = require('jsonwebtoken');
const Admin = require('../modals/adminSchema');

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies
        // console.log("token", cookies.cookie)
        const token = cookies.cookie
        console.log("token", token)
        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decodedToken = jwt.verify(token, "ONLYUSERS");
        console.log("decodedToken", decodedToken.id)

        // const {_id}  = decodedToken; 
        // console.log(_id)
        const user = await Admin.findById(decodedToken.id);
        console.log(user)

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};

module.exports = { userAuth };

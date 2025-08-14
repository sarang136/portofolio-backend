
const express = require('express')
const adminRouter = express.Router();
const bcrypt = require('bcrypt');
const admin = require('../modals/adminSchema')
const jwt = require('jsonwebtoken');



adminRouter.post('/admin-register', async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(400).json({ message: "Password hashing failed" });
        }
        const registeredAdmin = new admin({
            name,
            email,
            password: hashedPassword
        })
        await registeredAdmin.save()
        res.status(200).send({ admin: registeredAdmin })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

adminRouter.post('/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const adminFound = await admin.findOne({ email })
        if (!adminFound) {
            return res.status(400).json({ message: "Admin not found" })
        }
        const isValidPassword = await bcrypt.compare(password, adminFound.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ _id: adminFound._id }, "ONLYUSERS")

        if (!token) {
            return res.status(400).json({ message: "Token generation failed" })
        }
        // console.log(token)
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            sameSite: "none",
            httpOnly: true,
            secure: true, // agar https use kar raha hai
        });
        res.status(200).send({ message: "Admin Logged In ", admin: adminFound })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = adminRouter;
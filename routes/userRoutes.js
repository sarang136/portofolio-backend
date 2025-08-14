const express = require('express');
const userRouter = express.Router();
const userDetails = require('../modals/userDetails')

userRouter.post('/post-yourself', async (req, res) => {
    try {
        const { yourName, email, profileDescription, github, linkedin } = req.body;
        if (!yourName || !email || !profileDescription || !github || !linkedin) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }
        const userSaved = await userDetails({
            yourName,
            email,
            profileDescription,
            github,
            linkedin
        })
        const user = await userSaved.save();
        res.json({ message: 'User details saved successfully.', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Error Occured', error: error.message });
    }
})

module.exports = userRouter;
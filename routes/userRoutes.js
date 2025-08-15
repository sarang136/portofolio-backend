const express = require('express');
const userRouter = express.Router();
const userDetails = require('../modals/userDetails');
const { userAuth } = require('../middleware/auth');

userRouter.post('/post-yourself' , userAuth , async (req , res) => {
    try {
        const { yourName, email, profileDescription, github, linkedin } = req.body;
        if (!yourName || !email || !profileDescription || !github || !linkedin) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        const userExists = await userDetails.find({email});

        const userSaved = await userDetails({
            yourName,
            email,
            profileDescription,
            github,
            linkedin
        })
        const user = await userSaved.save();
        res.status(200).json({ message: 'User details saved successfully.', user: user });
    } catch (error) {
        res.status(500).json({ message: 'Error Occured', error: error.message });
    }
})

module.exports = userRouter;
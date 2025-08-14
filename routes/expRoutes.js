const express = require('express')
const expRouter = express.Router();
const Experience = require('../modals/expSchema')

expRouter.post('/post/experience', async (req, res) => {
    try {
        const { companyName, jobDescription, fromDate, toDate, address, jobRole, jobType } = req.body;
        if (!companyName || !jobDescription || !fromDate || !toDate || !address || !jobRole || !jobType) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }

        const newExperience = new Experience({
            companyName, jobDescription, fromDate, toDate, address, jobRole, jobType
        })
        const expData = await newExperience.save()
        res.status(200).json({ msg: "Experience Added Successfully", expData })
    } catch (error) {
        res.status(500).json({ message: "Error Occured" });
    }
})


module.exports = expRouter;
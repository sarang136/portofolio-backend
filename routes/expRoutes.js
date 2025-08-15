const express = require('express')
const expRouter = express.Router();
const Experience = require('../modals/expSchema');
const { userAuth } = require('../middleware/auth');

expRouter.post('/post/experience',userAuth, async (req, res) => {
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

expRouter.get('/get/experience', async (req, res) => {
    
    const expGot = await Experience.find({})
    if(!expGot){
        return res.status(404).json({ msg: "No Experience Found" })
    }
    res.status(200).json({ msg: "Experience Retrieved Successfully", expGot })
})

module.exports = expRouter;
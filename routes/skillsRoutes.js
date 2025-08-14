const express = require('express')
const skillsRouter = express.Router();
const Skills = require('../modals/skillsSchema')

skillsRouter.post('/add/skills', async (req, res) => {
    const { skillName, image } = req.body;
    try {
        if (!skillName) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }
        const newSkill = new Skills({ skillName, image });
        const savedSkill = await newSkill.save();
        res.status(200).json({ msg: "Skill added successfully", savedSkill });

    } catch (error) {
        console.log(error);
        res.send({ message: "Error", error: error.message })
    }
})

skillsRouter.get('/get/skills', async (req, res) => {
    const skillsGot = await Skills.find({})
    if (!skillsGot) {
        return res.status(404).json({ msg: "No skills found" })
    }
    res.status(200).json({ msg: "Skills fetched successfully", skillsGot });
})


module.exports = skillsRouter;
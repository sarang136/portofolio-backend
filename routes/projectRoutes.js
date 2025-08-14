const express = require('express');
const projectRouter = express.Router();
const projects = require('../modals/projectSchema')

projectRouter.post('/add-project', async (req, res) => {
    try {
        // console.log(req.body);
        const { projectName, projectDescription, skillsUsed } = req.body;
        
        if (!projectName || !projectDescription || !skillsUsed) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const savedProjects = await projects({
            projectName,
            projectDescription,
            skillsUsed
        })

        await savedProjects.save();
        res.json({ message: 'Project added successfully', project: savedProjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add project' });
    }
})

projectRouter.patch('/edit-project/:id', async (req, res) => {
    const id = req.params.id;
    const { projectName, projectDescription, skillsUsed } = req.body;
    try {
        if (!projectName || !projectDescription || !skillsUsed) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const foundEditedProjects = await projects.findByIdAndUpdate(id, {
            projectName,
            projectDescription,
            skillsUsed
        })
        if (!foundEditedProjects) {
            return res.status(404).json({ message: 'Project not found' });
        }
        await foundEditedProjects.save();
        res.json({ message: 'Project edited successfully', project: foundEditedProjects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to edit project' });
    }
})

projectRouter.get('/get-all-projects',async (req, res) => {
    try {
        const allProjects = await projects.find({});
        if(!allProjects){
            return res.status(404).json({message: 'No projects found'})
        }
        res.json({message: 'All projects retrieved successfully', projects: allProjects})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get all projects' });   
    }
})



module.exports = projectRouter;
'use server'
import { redirect } from 'next/navigation'
import { getDesignsCollection, getProjectsCollection } from "./mongodb"

export const createProject = async (_, formData) => {
    try {
        const collection = await getProjectsCollection()
        const projectName = formData.get('name')

        const existingProject = await collection.countDocuments({ name: projectName })
        if (existingProject !== 0) {
            return 'A Project with that name already exists'
        }

        const newProject = {
            name: projectName,
            description: formData.get('description'),
            created: new Date()
        }

        const result = await collection.insertOne(newProject)

        if (!result.insertedId) {
            console.log('No insertedId. Failed | 400')
            return 'Unable to store project'
        }

        redirect(`/project/${projectName}`)
    } catch (error) {
        console.error('Failed to store new project')
        console.error(error)
        return error.message
    }
}

export const createDesign = async (_, formData) => {
    const projectName = formData.get('projectName')
    const designName = formData.get('name')

    const gcodeFile = formData.get('inputFile')

    // TODO: Upload file (if present) to GCS and put path in MongoDB object
    console.log(`G-code file: ${gcodeFile.name}`)

    // TODO: implement save functionality
    console.log(`Form data -> Name: ${designName} | Project Name: ${projectName}`)

    try {
        const collection = await getDesignsCollection()
        const existingDesign = await collection.countDocuments({ project: projectName, name: designName })
        if (existingDesign !== 0) {
            return 'A design with that name already exists'
        }

        const newDesign = {
            project: projectName,
            name: designName,
            description: formData.get('description'),
            tool: formData.get('tool'),
            operation: formData.get('operation'),
            material: formData.get('material')
        }

        const result = await collection.insertOne(newDesign)

        if (!result.insertedId) {
            console.error('No InsertedId. Failed | 400')
            return 'Unable to store design'
        }

        redirect(`/projects/${projectName}/${designName}`)
    } catch (error) {
        console.error('Failed to create design')
        console.error(error)
        return error.message
    }
}

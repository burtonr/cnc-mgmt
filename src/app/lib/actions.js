'use server'
import { redirect } from 'next/navigation'
import { getProjectsCollection } from "./mongodb"

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
            created: new Date() }

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

    // TODO: temp to verify loading state on form
    await sleep(1500)

    const designName = formData.get('name')
    const projectName = formData.get('projectName')

    // TODO: implement save functionality
    console.log(`Form data -> Name: ${designName} | Project Name: ${projectName}`)
    // redirect(`/projects/${projectName}/${designName}`)
    return 'Unable to create design'
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
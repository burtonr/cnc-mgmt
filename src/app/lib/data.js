'use server'
import { getDesignsCollection, getProjectsCollection } from "./mongodb"

export const getProjects = async () => {
    const collection = await getProjectsCollection()
    const results = await collection.find({}).toArray()
    return results
}

export const getDesigns = async (projectName) => {
    const slug = projectName
    console.log(`getting designs for project [slug]: ${slug}`)
    const collection = await getDesignsCollection()
    const results = await collection.find({project: projectName}).toArray()
    return results
}
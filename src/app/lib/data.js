'use server'
import { getProjectsCollection } from "./mongodb"

export const getProjects = async () => {
    const collection = await getProjectsCollection()
    const results = await collection.find({}).limit(10).toArray()
    return results
}

export const getDesigns = async (projectName) => {
    const slug = projectName
    // TODO: Get project designs from MongoDB
    console.log(`getting designs for project [slug]: ${slug}`)
    return []
}
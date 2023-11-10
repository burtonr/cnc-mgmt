import { connectToDatabase } from "../../../lib/mongodb"

export default async function handler(req, res) {
    const { database } = await connectToDatabase()
    const collection = await database.collection('projects')

    if (req.method === 'POST') {
        // TODO: Create new project record
    } else if (req.method === 'GET') {
        // TODO: Get all project meta data
        const results = await collection.find({}).limit(10).toArray()

        res.status(200).json(results)
    } else {
        res.status(405)
    }
}
import { connectToDatabase } from "../../../lib/mongodb"

export default async function handler(req, res) {
    const { database } = await connectToDatabase()
    const collection = await database.collection('projects')

    if (req.method === 'POST') {
        // TODO: Create new project record and redirect to the newly created project page
        const data = req.body
        const result = await collection.insertOne(data)

        if (!result.insertedId)
            res.status(400).json({ error: 'Unable to store project'})
        
        res.redirect(307, `/projects/${data.name}`)
    } else if (req.method === 'GET') {
        // TODO: Get all project meta data
        const results = await collection.find({}).limit(10).toArray()

        res.status(200).json(results)
    } else {
        res.status(405)
    }
}
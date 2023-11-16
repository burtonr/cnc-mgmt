import { connectToDatabase } from "../mongodb"

const { database } = await connectToDatabase()
const collection = await database.collection('projects')

export async function GET() {
    const results = await collection.find({}).limit(10).toArray()
    return Response.json(results)
}

export async function PUT(request) {
    try {
        const data = await request.json()

        const existingProject = await collection.countDocuments({ name: data.name })
        if (existingProject !== 0) {
            return Response.json({ error: 'A Project with that name already exists' }, { status: 400 })
        }

        const newProject = { ...data, created: new Date()}

        const result = await collection.insertOne(newProject)

        if (!result.insertedId) {
            console.log('No insertedId. Failed | 400')
            return Response.json({ error: 'Unable to store project' }, { status: 400 })
        }

        return new Response(null, { status: 204 })
    } catch (error) {
        console.error('Failed to store new project')
        console.error(error)
        return Response.json({ error: error }, { status: 500 })
    }
}

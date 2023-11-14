import { connectToDatabase } from "../mongodb"

const { database } = await connectToDatabase()
const collection = await database.collection('projects')

export async function GET() {
    const results = await collection.find({}).limit(10).toArray()

    // res.status(200).json(results)
    return Response.json(results)
}

// export default async function handler(req, res) {
//     const { database } = await connectToDatabase()
//     const collection = await database.collection('projects')

//     if (req.method === 'POST') {
//         console.log('creating new project')
//         console.log('req body:')
//         console.log(req.body)
//         try {
//             const data = JSON.parse(req.body)
//             console.log(`Creating project: ${data.name}`)
//             const result = await collection.insertOne(data)

//             if (!result.insertedId) {
//                 console.log('No insertedId. Failed | 400')
//                 res.status(400).json({ error: 'Unable to store project' })
//             }

//             console.log(`Success! Inserted Id: ${result.insertedId}`)

//             res.redirect(302, `/projects/${data.name}`)
//         } catch (error) {
//             console.error('Failed to store new project')
//             console.error(error)
//             res.status(500).json({ error: error })
//         }

//     } else if (req.method === 'GET') {
//         // TODO: Get all project meta data
//         const results = await collection.find({}).limit(10).toArray()

//         res.status(200).json(results)
//     } else {
//         console.log('Request not POST or GET. Not allowed')
//         res.status(405)
//     }
// }
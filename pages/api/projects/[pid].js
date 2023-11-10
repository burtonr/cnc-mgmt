export default function handler(req, res) {
    const { pid } = req.query

    if (req.method === 'PATCH') {
        // TODO: Update the project
    } else if (req.method === 'GET') {
        // TODO: Return all project data for the pid
    } else {
        res.status(405)
    }
}
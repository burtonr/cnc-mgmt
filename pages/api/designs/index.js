export default function handler(req, res) {
    if (req.method === 'POST') {
        // TODO: Create new design record
    } else if (req.method === 'GET') {
        // TODO: Get all design meta data
    } else {
        res.status(405)
    }
}
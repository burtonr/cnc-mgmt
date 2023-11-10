import useSWR from 'swr'
import { fetcher } from '../../lib/api'

function noProjectDisplay() {
    return (
        <>
            <div>There are no projects</div>
            <div>Create a new Project...</div>
        </>
    )
}

export default function projects() {
    const { data, error, isLoading } = useSWR('/api/projects', fetcher)

    if (error) return <div>Failed to load projects</div>
    if (isLoading) return <div>Loading...</div>

    if (!data || data.length === 0) return noProjectDisplay()

    return <div>TODO: list of projects...</div>
}
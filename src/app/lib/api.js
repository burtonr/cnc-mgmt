export const fetcher = (url) => fetch(url).then((res) => res.json());

export const createProject  = async (projectName, projectDescription) => {
    const response = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({
            name: projectName,
            description: projectDescription,
        })
    })

    console.group('Response...')
    console.log(response.status)
    console.log(response.statusText)
    console.log(JSON.stringify(response.body))

    console.groupEnd()

    if (!response.ok) {
        throw new Error('Unable to create new project. Try again later');
    }
}
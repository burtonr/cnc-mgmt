export const fetcher = (url) => fetch(url).then((res) => res.json());

export const createProject  = async (projectName, projectDescription) => {
    const response = await fetch('/api/projects', {
        method: 'PUT',
        body: JSON.stringify({
            name: projectName,
            description: projectDescription,
        })
    })

    if (!response.ok) {
        const data = await response.json()
        let errorMsg = 'Unable to create new project. Try again later'
        if (data && data.error) {
            errorMsg = data.error
        } 
        throw new Error(errorMsg);
    }
}
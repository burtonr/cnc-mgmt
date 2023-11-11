import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../lib/api'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Layout from '../../components/layout';
import NoItems from '../../components/noItems';

export default function projects() {
    const [open, setOpen] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')
    const [newProjectDescription, setNewProjectDescription] = useState('')
    const { data, error, isLoading } = useSWR('/api/projects', fetcher)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSubmit(event) {
        console.log('Submitting new project...')

        event.preventDefault()
        // setIsLoading(true)
        // setError(null)

        try {
            // TODO: Call the API with the data
            console.log(`Creating project: ${newProjectName}`)
            console.log(`Project description: ${newProjectDescription}`)
        } catch (error) {
            // setError(error.message)
            console.error(error)
        } finally {
            // setIsLoading(false)
            console.log('complete')
        }
    }

    function createProjectDialog() {
        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create a Project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create a new project to manage all the associated designs in one place
                        </DialogContentText>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name='name'
                                value={newProjectName}
                                onChange={e => setNewProjectName(e.target.value)}
                                label="Project Name"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                name='description'
                                value={newProjectDescription}
                                onChange={e => setNewProjectDescription(e.target.value)}
                                label="Description"
                                fullWidth
                                variant="standard"
                            />
                        </form>
                        {error && <div style={{ color: 'red'}}>{error}</div>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' onClick={handleSubmit}>Create</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    if (error) return <div>Failed to load projects</div>
    if (isLoading) return <div>Loading...</div>

    // return <div>TODO: list of projects...</div>
    return (
        <Layout>
            {(!data || data.length === 0) 
                && <NoItems
                        itemType={'project'}
                        onButtonClickHandler={handleClickOpen}
                    />
            }
            {createProjectDialog()}
        </Layout>
    )
}
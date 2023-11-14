// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// export default function ProjectsPage() {
//   return (
//     <Container>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="body1" gutterBottom>
//           Projects Page
//         </Typography>
//       </Box>
//     </Container>
//   );
// }

'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { createProject, fetcher } from '../lib/api'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NoItems from '../../components/noItems';

export default function Page() {
    const [open, setOpen] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')
    const [newProjectDescription, setNewProjectDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState(null)
    const { data, error, isLoading } = useSWR('/api/projects', fetcher)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setNewProjectName('')
        setNewProjectDescription('')
        setOpen(false)
    }

    async function handleSubmit(event) {
        console.log('submitting...')
    //     event.preventDefault()
    //     setIsSaving(true)
    //     setSaveError(null)

    //     try {
    //         const newProject = await createProject(newProjectName, newProjectDescription)
    //         // const response = await fetch('/api/projects', {
    //         //     method: 'POST',
    //         //     body: JSON.stringify({
    //         //         name: newProjectName,
    //         //         description: newProjectDescription,
    //         //     })
    //         // })

    //         // console.log('Response...')
    //         // console.log(JSON.stringify(response))

    //         // if (!response.ok) {
    //         //     throw new Error('Unable to create new project. Try again later');
    //         // }
    //     } catch (error) {
    //         setSaveError(error.message)
    //         console.error(error)
    //     } finally {
    //         setIsSaving(false)
    //     }
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
                        {saveError && <div style={{ color: 'red' }}>{saveError}</div>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' disabled={isSaving} onClick={handleSubmit}>
                            {isSaving ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    if (error) return <div>Failed to load projects</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <Container>
            {(!data || data.length === 0)
                && <NoItems
                    itemType={'project'}
                    onButtonClickHandler={handleClickOpen}
                />
            }
            {(data && data.length >= 1)
                && <Button variant="outlined" onClick={handleClickOpen}>
                    Create New Project
                </Button>
            }

            {createProjectDialog()}
        </Container>
    )
}
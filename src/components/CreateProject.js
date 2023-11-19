'use client'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createProject } from '@/app/lib/actions'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function CreateProject() {
    const [open, setOpen] = useState(false)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <ProjectForm onCancel={handleClose} />
            </Dialog>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ float: 'right' }}>
                Create New Project
            </Button>
        </>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' disabled={pending}>
            {pending ? 'Creating...' : 'Create'}
        </Button>
    )
}

function ProjectForm({ onCancel }) {
    const [saveError, formAction] = useFormState(createProject, null)
    return (
        <form action={formAction}>
            <DialogTitle>Create a Project</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new project to manage all the associated designs in one place
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name='name'
                    label="Project Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="description"
                    name='description'
                    label="Description"
                    fullWidth
                    variant="standard"
                />
                {saveError && <div style={{ color: 'red' }}>{saveError}</div>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <SubmitButton />
            </DialogActions>
        </form>
    )
}

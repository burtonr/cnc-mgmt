'use client'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { createDesign } from '@/app/lib/actions'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function CreateDesign({ projectName }) {
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
                <DesignForm project={projectName} onCancel={handleClose} />
            </Dialog>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ float: 'right' }}>
                Create New Design
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

function DesignForm({ project, onCancel }) {
    const [saveError, formAction] = useFormState(createDesign, null)
    return (
        <form action={formAction}>
            <DialogTitle>Create a Design</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new design to manage the tool, material, and gcode in one place
                </DialogContentText>
                <input hidden defaultValue={project} name='projectName' />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name='name'
                    label="Design Name"
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
                <TextField
                    margin="dense"
                    id="tool"
                    name='tool'
                    label="Tool"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="operation"
                    name='operation'
                    label="Operation"
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

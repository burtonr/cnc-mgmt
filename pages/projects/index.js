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
    const { data, error, isLoading } = useSWR('/api/projects', fetcher)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSubmit() {
        console.log('Submitting new project...')
    }

    function createProjectDialog() {
        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Subscribe</Button>
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
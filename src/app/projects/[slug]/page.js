'use client'
import useSWR from 'swr'
import { useState } from 'react'
import { createProject, fetcher } from '@/app/lib/api'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import NoItems from '@/components/noItems';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Date from '@/components/date'
import styles from '@/app/projects/projects.module.css'

export default function Page({ params }) {
    const [open, setOpen] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')
    const [newProjectDescription, setNewProjectDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState(null)
    const { data, error, isLoading } = useSWR(`/api/projects/${decodeURIComponent(params.slug)}`, fetcher)
    const { push } = useRouter()

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setNewProjectName('')
        setNewProjectDescription('')
        setSaveError(null)
        setOpen(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSaving(true)
        setSaveError(null)

        try {
            await createProject(newProjectName, newProjectDescription)
            push(`/projects/${newProjectName}`)
        } catch (error) {
            setSaveError(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    function createDesignDialog() {
        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create a Design</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create a new design to manage the tool, material, and gcode in one place
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

    function createDesignButton() {
        if (data && data.length >= 1) {
            return (
                <Button variant="outlined" onClick={handleClickOpen} sx={{ float: 'right' }}>
                    Create New Design
                </Button>
            )
        }
    }

    function designList() {
        return (
            <>
                <Typography variant='h4' component='div'>
                    Designs
                </Typography>
                <Grid container spacing={2} justifyContent='center'>
                    {data.map((design, index) => (
                        <Grid xs={12} md={6} lg={4} key={index}>
                            <Card className={styles.projectCard}>
                                <CardActionArea href={`/designs/${design.name}`}>
                                    <CardContent>
                                        <Typography variant='caption' color="text.secondary">
                                            <Date dateString={design.created} />
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {design.name}
                                        </Typography>
                                        <Typography className={styles.description} color="text.secondary" gutterBottom>
                                            {design.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* <CardActions> */}
                                {/* TODO: Delete? Edit? */}
                                {/* <Button size="small">Learn More</Button> */}
                                {/* </CardActions> */}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }

    if (error) return <div>Failed to load designs</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <Container>
            {createDesignButton()}
            {designList()}
            <NoItems data={data} itemType={'design'} onButtonClickHandler={handleClickOpen} />
            {createDesignDialog()}
        </Container>
    )
}
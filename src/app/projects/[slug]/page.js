'use client'
import useSWR from 'swr'
import { useState } from 'react'
import { fetcher } from '@/app/lib/api'
import { createDesign } from '../../lib/actions'
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
    const projectName = decodeURIComponent(params.slug)
    const [open, setOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState(null)
    const { data, error, isLoading } = useSWR(`/api/projects/${projectName}`, fetcher)

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setNewDesignName('')
        setNewDesignDescription('')
        setSaveError(null)
        setOpen(false)
    }

    function createDesignDialog() {
        return (
            <>
                <Dialog open={open} onClose={handleClose}>
                    <form action={e => createDesign(e, projectName)}>
                        <DialogTitle>Create a Design</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Create a new design to manage the tool, material, and gcode in one place
                            </DialogContentText>
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
                            {saveError && <div style={{ color: 'red' }}>{saveError}</div>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit' disabled={isSaving}>
                                {isSaving ? 'Creating...' : 'Create'}
                            </Button>
                        </DialogActions>
                    </form>
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
                                <CardActionArea href={`/projects/${projectName}/designs/${design.name}`}>
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
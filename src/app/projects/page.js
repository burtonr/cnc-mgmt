import { getProjects } from '../lib/data'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2';
import NoItems from '@/components/NoItems';
import Typography from '@mui/material/Typography'
import Date from '@/components/Date'
import styles from './projects.module.css'
import CreateProject from '@/components/CreateProject';

export default async function Page() {
    const data = await getProjects()

    function projectList() {
        return (
            <>
                <Typography variant='h4' component='div'>
                    Projects
                </Typography>
                <Grid container spacing={2} justifyContent='center'>
                    {data.map((project, index) => (
                        <Grid xs={12} md={6} lg={4} key={index}>
                            <Card className={styles.projectCard}>
                                <CardActionArea href={`/projects/${project.name}`}>
                                    <CardContent>
                                        <Typography variant='caption' color="text.secondary">
                                            <Date dateString={project.created} />
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {project.name}
                                        </Typography>
                                        <Typography className={styles.description} color="text.secondary" gutterBottom>
                                            {project.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }

    return (
        <Container>
            {(data && data.length >= 1) && <CreateProject />}

            {projectList()}
            <NoItems data={data} itemType={'project'} createComponent={<CreateProject/>} />
        </Container>
    )
}
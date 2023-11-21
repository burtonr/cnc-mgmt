import { getDesigns } from '@/app/lib/data';
import CreateDesign from '../../../components/CreateDesign'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2';
import NoItems from '@/components/NoItems';
import Typography from '@mui/material/Typography'
import Date from '@/components/Date'
import styles from '@/app/projects/projects.module.css'

export default async function Page({ params }) {
    const projectName = decodeURIComponent(params.projectSlug)
    const data = await getDesigns(projectName)


    function designList() {
        return (
            <>
                <Typography variant='h4' component='div' className={styles.capitalCase}>
                    {projectName} Designs
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
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }

    return (
        <Container>
            {(data && data.length >= 1) && <CreateDesign projectName={projectName} />}
            {designList()}
            <NoItems data={data} itemType={'design'} createComponent={<CreateDesign  projectName={projectName}/>} />
        </Container>
    )
}
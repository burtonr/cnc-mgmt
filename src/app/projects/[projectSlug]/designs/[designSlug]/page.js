import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default async function Page({ params }) {
    const designName = decodeURIComponent(params.designSlug)
    // const data = await getDesignDetails(designName)

    return (
        <Container>
            <Typography variant='h4' component='div'>
                {designName}
            </Typography>
        </Container>
    )
}
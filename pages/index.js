import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout home>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Material UI - Next.js example
          </Typography>
          <p>This will become a login page, and the link below will not be needed</p>
          <Link href="/projects" color="secondary">
            View Projects
          </Link>
        </Box>
      </Container>
    </Layout>
  );
}

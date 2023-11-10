import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';

// import Head from 'next/head';
// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
import { getSortedProjectData } from '../lib/projects';
// import Link from 'next/link';
// import Date from '../components/date';

export default function Home({ allProjectsData }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Container>
  );
  // return (
  //   <Layout home>
  //     <Head>
  //       <title>{siteTitle}</title>
  //     </Head>
  //     <section className={utilStyles.headingMd}>
  //       <p>[Your Self Introduction]</p>
  //       <p>
  //         (This is a sample website - you’ll be building a site like this on{' '}
  //         <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
  //       </p>
  //     </section>

  //     <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
  //       <h2 className={utilStyles.headingLg}>Projects</h2>
  //       <ul className={utilStyles.list}>
  //         {allProjectsData.map(({ id, date, title }) => (
  //           <li className={utilStyles.listItem} key={id}>
  //             <Link href={`/projects/${id}`}>{title}</Link>
  //             <br />
  //             <small className={utilStyles.lightText}>
  //               <Date dateString={date} />
  //             </small>
  //           </li>
  //         ))}
  //       </ul>
  //     </section>

  //   </Layout>
  // );
}

// TODO: This is for static generation. Look into "On-Demand Revalidation" which can be triggered manually
// ref: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation
export async function getStaticProps() {
  const allProjectsData = getSortedProjectData();
  return {
    props: {
      allProjectsData,
    },
  };
}

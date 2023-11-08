import Head from "next/head";
import Layout from "../../components/layout";
import { getProjectIds, getProjectData } from "../../lib/projects";

export default function Project({ projectData }) {
    // TODO: This is from Next Tutorial. Change to load Project name, date, etc, and the list of "designs"
    return (
        <Layout>
            <Head>
                <title>{projectData.Title}</title>
            </Head>

            {projectData.Title}
            <br/>
            {projectData.id}
            <br/>
            {/* TODO: Format date
                Next.js tutorial example: https://nextjs.org/learn-pages-router/basics/dynamic-routes/polishing-post-page
                Example library: https://date-fns.org/
             */}
            {projectData.date}
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getProjectIds()
    return {
        paths,
        fallback: false
    }
}

// TODO: This is for static generation. Change to getServerSideProps(context)
// ref: https://nextjs.org/docs/pages/building-your-application/data-fetching#getserversideprops-server-side-rendering
export async function getStaticProps({ params }) {
    const projectData = getProjectData(params.id)
    return {
        props: {
            projectData,
        }
    }
}
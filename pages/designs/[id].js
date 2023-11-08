import Head from "next/head";
import Layout from "../../components/layout";
import { getDesignIds, getDesignData } from "../../lib/designs";

export default function Design({ designData }) {
    // TODO: This is from Next Tutorial. Change to load Design name, date, etc
    return (
        <Layout>
            <Head>
                <title>{designData.Title}</title>
            </Head>

            {designData.Title}
            <br/>
            {designData.id}
            <br/>
            {/* TODO: Format date
                Next.js tutorial example: https://nextjs.org/learn-pages-router/basics/dynamic-routes/polishing-post-page
                Example library: https://date-fns.org/
             */}
            {designData.date}
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getDesignIds()
    return {
        paths,
        fallback: false
    }
}

// TODO: This is for static generation. Change to getServerSideProps(context)
// ref: https://nextjs.org/docs/pages/building-your-application/data-fetching#getserversideprops-server-side-rendering
export async function getStaticProps({ params }) {
    const designData = getDesignData(params.id)
    return {
        props: {
            designData,
        }
    }
}
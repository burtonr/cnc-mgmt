import { redirect } from 'next/navigation';

export default function Page({ params }) {
    const designProject = params.projectSlug

    redirect(`/projects/${designProject}`)
}
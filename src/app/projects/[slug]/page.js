export default function Page({ params }) {
    return <div>Project: {decodeURIComponent(params.slug)}</div>
}
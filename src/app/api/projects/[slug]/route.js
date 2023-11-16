export async function GET(request, { params }) {
    const slug = params.slug
    // TODO: Get project designs from MongoDB
    console.log(`getting api project [slug]: ${slug}`)
    return Response.json([])
}
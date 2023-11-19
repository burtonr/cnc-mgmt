'use client'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Chip from '@mui/material/Chip'

export default function NavLinks() {
    const router = useRouter()

    function generateBreadcrumbs() {
        const asPathNestedRoutes = usePathname().split("/").filter(v => v.length > 0)
        const crumbList = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/")
            const text = subpath
            return { href, text }
        })

        return crumbList
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <Breadcrumbs aria-label='breadcrumb' sx={{ paddingLeft: 4 }} separator="›">
            {breadcrumbs.map((crumb, idx) => (
                <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
            ))}
        </Breadcrumbs>
    )
}

function Crumb({ text, href, last = false }) {
    const labelText = decodeURIComponent(text)
    if (last) {
        return <Chip label={labelText} variant='outlined' />
    }

    return <Chip label={labelText} component='a' href={href} clickable />
}
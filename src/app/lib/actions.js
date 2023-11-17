'use server'
import { redirect } from 'next/navigation'

export const createDesign = async (formData, projectName) => {
    const designName = formData.get('name')
    console.log(`Form data -> Name: ${designName}`)
    redirect(`/projects/${projectName}/${designName}`)
}
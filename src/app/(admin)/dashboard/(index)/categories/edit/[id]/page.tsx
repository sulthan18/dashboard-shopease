import React from 'react'
import { getCategory } from '../../lib/data'
import { redirect } from 'next/navigation'
import FormCategory from '../../_components/form-category'

type Tparams = {
    id: string
}

interface EditPageProps {
    params: Tparams
}

export default async function EditPage({ params }: EditPageProps) {
    const data = await getCategory(params.id)

    if (!data) {
        return redirect('/dashboard/categories')
    }

    (data);

    return <FormCategory type='EDIT' data={data} />
}

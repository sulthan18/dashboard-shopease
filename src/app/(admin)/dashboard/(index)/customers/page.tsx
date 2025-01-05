import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from './columns'
import { getCustomers } from './lib/data'

export default async function CustomersPage() {

    const customers = await getCustomers()

    return (
        <div className='space-y-4'>
            <Card x-chunk='dashboard-06-chunk-0'>
                <CardHeader>
                    <CardTitle>Customer</CardTitle>
                    <CardDescription>
                        Manage your customers and view their sales performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={customers} />
                </CardContent>
            </Card>
        </div>
    )
}

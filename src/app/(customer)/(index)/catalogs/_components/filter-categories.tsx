import { getCategories } from '@/app/(admin)/dashboard/(index)/categories/lib/data'
import React from 'react'
import FilterCheckboxItem from './filter-checkbox-item'

export default async function FilterCategories() {
    const categories = await getCategories()

    return (
        <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Categories</p>
            {categories.map((item) => (
                // <label key={`${item.id + item.name}`} htmlFor={`${item.id + item.name}`} className='font-semibold flex items-center gap-3'>
                //     <input
                //         type="checkbox"
                //         name="brand"
                //         value={item.id}
                //         className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
                //     />
                //     <span>{item.name}</span>
                // </label>
                <FilterCheckboxItem type='category' key={item.id + item.name} id={item.id.toString()} value={item.name} />
            ))}
        </div>
    )
}

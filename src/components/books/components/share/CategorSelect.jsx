import { Input, Select } from 'antd'
import React from 'react'
import { useGetCategoriesQuery } from '../../../../Redux/Apis/service/categoryApis'

function CategorSelect({ setSearch, onChange, style }) {
    const { data, isLoading } = useGetCategoriesQuery()
    return (
        <div className='flex items-center justify-center gap-2'>
            {setSearch && <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search" style={{ width: 250 }} />}
            {onChange && <Select loading={isLoading} onChange={onChange} placeholder="Select Category" style={style}>
                {data?.data?.bookCategories?.map((category) => (
                    <Select.Option key={category?._id} value={category?.name}>
                        {category?.name}
                    </Select.Option>
                ))}
            </Select>}
        </div>
    )
}

export default CategorSelect
import React, { useEffect } from 'react'
import { Form, Select } from 'antd'

function TagsSelect({ form, item }) {
    console.log(item)
    useEffect(() => {
        if (item) {
            form.setFieldsValue({ tags: item?.tags[0] });
        }
    }, [item]);
    return (
        <Form.Item
            label="Select Type"
            name="tags"
            rules={[{ required: true, message: "Please select type" }]}
        >
            <Select placeholder="Select Type">
                <Select.Option value="recommended">Recommended</Select.Option>
                <Select.Option value="new_release">New Release</Select.Option>
                <Select.Option value="tranding">Trending</Select.Option>
                <Select.Option value="for_you">For You</Select.Option>
            </Select>
        </Form.Item>
    )
}

export default TagsSelect
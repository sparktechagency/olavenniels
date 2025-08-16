import { Form, Input, Select, DatePicker, InputNumber } from 'antd';
import React from 'react';

const CustomInput = ({
    type = 'text',
    name,
    label,
    placeholder,
    rules,
    options, // For select dropdown
    disabled,
    style,
    className,
    ...restProps
}) => {
    const renderInput = () => {
        switch (type) {
            case 'text':
                return <Input placeholder={placeholder} {...restProps} />;
            case 'password':
                return <Input.Password placeholder={placeholder} {...restProps} />;
            case 'textarea':
                return <Input.TextArea placeholder={placeholder} {...restProps} />;
            case 'select':
                return (
                    <Select placeholder={placeholder} {...restProps}>
                        {options?.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case 'number':
                return <InputNumber placeholder={placeholder} {...restProps} />;
            case 'date':
                return <DatePicker placeholder={placeholder} {...restProps} />;
            default:
                return <Input placeholder={placeholder} {...restProps} />;
        }
    };

    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            style={style}
            className={className}
        >
            {renderInput()}
        </Form.Item>
    );
};

export default CustomInput;
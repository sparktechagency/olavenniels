import { Form, Input, Select, InputNumber } from 'antd';
import React from 'react';

const CustomInput = ({
    form,
    type = 'text',
    name,
    label,
    placeholder,
    rules,
    options,
    disabled,
    style,
    className,
    ...restProps
}) => {
    const renderInput = () => {
        switch (type) {
            case 'text':
                return <Input className={className} disabled={disabled} size='large' placeholder={placeholder} {...restProps} />;
            case 'password':
                return <Input.Password className={className} disabled={disabled} size='large' placeholder={placeholder} {...restProps} />;
            case 'textarea':
                return <Input.TextArea className={className} disabled={disabled} size='large' placeholder={placeholder} {...restProps} />;
            case 'select':
                return (
                    <Select className={className} disabled={disabled} size='large' placeholder={placeholder} {...restProps}>
                        {options?.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case 'number':
                return <InputNumber className={className} disabled={disabled} size='large' placeholder={placeholder} {...restProps} />;
            default:
                return <Input className={className} disabled={disabled} size='large' placeholder={placeholder} {...restProps} />;
        }
    };

    return (
        <Form.Item
            form={form}
            name={name}
            label={label}
            rules={rules}
            style={style}
            disabled={disabled}
        >
            {renderInput()}
        </Form.Item>
    );
};

export default CustomInput;
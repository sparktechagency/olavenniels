import { Button } from 'antd'
import React from 'react'

function RectangleButton({ btnText, btnIcon, btnSize, btnType, btnColor, btnOnClick, btnClassName }) {
    return (
        <Button
            icon={btnIcon}
            size={btnSize}
            type={btnType}
            color={btnColor}
            onClick={btnOnClick}
            style={btnClassName}
            shape='default'
        >
            {btnText}
        </Button>
    )
}

export default RectangleButton
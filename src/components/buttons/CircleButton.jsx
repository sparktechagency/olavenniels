import { Button } from 'antd'
import React from 'react'

function CircleButton({ btnText, btnIcon, btnSize, btnType, btnColor, btnOnClick, btnClassName, ...props }) {
    return (
        <Button
            icon={btnIcon}
            size={btnSize}
            type={btnType}
            color={btnColor}
            onClick={btnOnClick}
            style={btnClassName}
            shape='circle'
            {...props}
        >
            {btnText}
        </Button>
    )
}

export default React.memo(CircleButton)
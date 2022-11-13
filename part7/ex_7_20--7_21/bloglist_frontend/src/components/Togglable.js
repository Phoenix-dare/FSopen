// eslint-disable-next-line no-unused-vars
import { useState, forwardRef, useImperativeHandle } from 'react'
import React from 'react'

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible((prev) => !prev)
    }
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div className='width-auto height-auto basis-1/12 bg-red-200'>
            <div style={hideWhenVisible}>
                <button
                    className='bg-red-500  group relative 
            flex w-full justify-center rounded-md 
            border border-transparent  py-2 px-4 text-sm 
            font-medium text-white hover:bg-red-700 focus:outline-none 
            focus:ring-2 
            focus:ring-red-500 focus:ring-offset-2'
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button
                    onClick={toggleVisibility}
                    className='bg-red-500  group relative 
            flex w-full justify-center rounded-md 
            border border-transparent  py-2 px-4 text-sm 
            font-medium text-white hover:bg-red-700 focus:outline-none 
            focus:ring-2 
            focus:ring-red-500 focus:ring-offset-2'
                >
                    cancel
                </button>
            </div>
        </div>
    )
})

export default Togglable

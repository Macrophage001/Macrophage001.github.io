import React from 'react'
import '../App.css'

const Content = ({ contentDescription, component }) => (
    <div className="content">
        <div className="content-description">
            <h3 className='font-light text-center'>
                {contentDescription}
            </h3>
        </div>
        {component}
    </div>
)

export default Content
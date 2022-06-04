import React from 'react'
import '../styles/App.css'

const Content = ({ contentDescription, children }) => (
    <div className="content">
        <div className="content-description">
            <h3 className='font-light text-center'>
                {contentDescription}
            </h3>
        </div>
        {children}
    </div>
)

export default Content
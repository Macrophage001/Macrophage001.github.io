import React from 'react'

import '../styles/App.css'

const Header = ({ title, subtitle }) => (
    <div className="header">
        <div className='hero-image'></div>
        <div className="hero-text">
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
        </div>
    </div>
)

export default Header
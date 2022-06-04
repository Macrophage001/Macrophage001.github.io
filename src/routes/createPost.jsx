import React from 'react'

import Header from '../components/header'
import NavLinks from '../components/navLinks'
import Content from '../components/content'

import tryCatch from '../utils/util'
import axios from 'axios'

const navLinks = [
    { link: '/', title: 'Home' },
    { link: "#", title: "Tags" },
    { link: "#", title: "Contact" },
    { link: "/projects", title: "Projects" },
    { link: "/About", title: "About" },
]

const Create = () => {

    const handleSubmit = (e) => {
        tryCatch(async e => {
            await axios.post('/posts', e.target.value);
        })(e);
    }

    return (
        <div className="about-me">
            <div className="description">
                <form className="post-form" onSubmit={handleSubmit} method="post">
                    <input type="text" name="Title" className='post-input' placeholder='Title' />
                    <textarea type="text" name="" className='post-input' placeholder='Enter text here...' />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

const CreatePost = () => {
    return (
        <div className="main">
            <Header title="Submit a post" subtitle="" />
            <NavLinks links={navLinks} />
            <Content contentDescription="">
                <Create />
            </Content>
        </div>
    )
}

export default CreatePost
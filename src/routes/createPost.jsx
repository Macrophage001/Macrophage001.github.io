import React, { useState, useRef } from 'react'

import Header from '../components/header'
import NavLinks from '../components/navLinks'
import Content from '../components/content'

import { tryCatch } from '../utils/util'
import axios from 'axios'

const navLinks = [
    { link: '/', title: 'Home' },
    { link: "#", title: "Tags" },
    { link: "#", title: "Contact" },
    { link: "/projects", title: "Projects" },
    { link: "/About", title: "About" },
]

const Create = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postTags, setPostTags] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        tryCatch(async () => {
            await axios.post('/posts', { title: postTitle, desc: postContent, tags: postTags });
        })();
    }
    const handleTextArea = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            setPostContent(postContent + '\t');
        }
    }

    return (
        <div className="about-me">
            <div className="description">
                <form className="post-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" value={postTitle} onChange={e => setPostTitle(e.target.value)} className='post-input' placeholder='Title' />
                    <textarea type="text" name="" value={postContent} onKeyDown={handleTextArea} onChange={e => setPostContent(e.target.value)} className='post-input' placeholder='Enter text here...' />
                    <input type="text" name="tags" value={postTags.toString()} onChange={e => setPostTags(e.target.value.split(','))} className='post-input' placeholder='tag1, tag2, tag3, ...' />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

const CreatePost = () => (
    <div className="main">
        <Header title="Submit a post" subtitle="" />
        <NavLinks links={navLinks} />
        <Content contentDescription="">
            <Create />
        </Content>
    </div>
)

export default CreatePost
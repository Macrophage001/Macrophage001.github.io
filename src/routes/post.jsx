import React from 'react'
import ReactMarkdown from 'react-markdown';

import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/header';
import NavLinks from '../components/navLinks';
import Content from '../components/content';

import { generateUUID } from '../utils/util';

const navLinks = [
    { link: '/', title: 'Home' },
    { link: "#", title: "Tags" },
    { link: "#", title: "Contact" },
    { link: "/projects", title: "Projects" },
    { link: "/About", title: "About" },
    { link: "/submit", title: <FontAwesomeIcon icon={faPlusSquare} /> },
]

const Post = () => {
    const { post } = useLocation().state;
    return (
        <div className="main">
            <Header title={post.title} subtitle="" />
            <NavLinks links={navLinks} />
            <Content contentDescription="">
                <div className="posts">
                    <div key={generateUUID(post.title)} className="post-full">
                        <nav>
                            <ul>
                                {post.tags && post.tags.map(tag => (
                                    <li key={generateUUID(tag)}><Link to="#">{`#${tag}`}</Link></li>
                                ))}
                            </ul>
                        </nav>
                        <ReactMarkdown className='font-light'>{post.desc}</ReactMarkdown>
                    </div>
                </div>
            </Content >
        </div >
    )
}

export default Post
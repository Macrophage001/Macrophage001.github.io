import React from 'react'
import Header from '../components/header'
import NavLinks from '../components/navLinks'
import Content from '../components/content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
    { link: '/', title: 'Home' },
    { link: "#", title: "Tags" },
    { link: "#", title: "Contact" },
    { link: "/projects", title: "Projects" },
    { link: "/submit", title: <FontAwesomeIcon icon={faPlusSquare} /> },
]

const Description = () => (
    <div className="about-me">
        <div className='description'>
            <div className='profile-pic' />
            <div id='description-content'>
                <p className='font-light text-center'>Hello, my name is Darnell Champen and I</p>
                <h2 className='text-center'>Love to program!</h2>
                <p className='font-light'>
                    I have been doing so for ~15 years now and discover new things every day! If you'd like to join me on my
                    journey to learn new and interesting programming topics (anywhere from lambda calculus in Javascript, to fancy tricks and tips in Unity),
                    I will be posting on here semi-regularly! Also make sure to take a look at some my projects if you'd like!
                </p>
            </div>
        </div>
    </div>
)



const About = () => (
    <div className="main">
        <Header title="About Me" subtitle="" />
        <NavLinks links={navLinks} />
        <Content contentDescription="" component={<Description />} />
    </div>
)

export default About
import React from 'react'

import Header from '../components/header'
import NavLinks from '../components/navLinks'
import Content from '../components/content'

import '../styles/App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const navLinks = [
    { link: '/', title: 'Home' },
    { link: "#", title: "Tags" },
    { link: "#", title: "Contact" },
    { link: "/About", title: "About" },
    { link: "/submit", title: <FontAwesomeIcon icon={faPlusSquare} /> },
]

const ProjectListing = ({ projects }) => (
    <>
        {projects && projects.map(project => (
            <div className="display-flex flexDirection-column justifyContent-center alignItems-center">
                <div className='project-information'>
                    <img src={project.thumbnailPath} alt='project_thumbnail' className='thumbnail-pic' />
                    <div id='project-description'>
                        <h2>{project.title}</h2>
                        <p className='font-light'>{project.desc}</p>
                    </div>
                </div>
            </div>
        ))}
    </>
)

const Projects = () => {
    const projects = [
        {
            title: 'Space Battle',
            desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, commodi maiores obcaecati consequuntur et odit! Ad saepe voluptate ipsum in, dolor veritatis perspiciatis dolores pariatur illo repudiandae esse atque deserunt?
                        Quidem, odit exercitationem, placeat quod ut natus architecto atque, delectus asperiores eaque sint molestiae distinctio temporibus deleniti sed iure ex. Maiores corporis deserunt voluptate aliquid pariatur officiis sint adipisci fugiat.`,
            thumbnailPath: `${process.env.PUBLIC_URL}/projects/games/SpaceBattle/thumbnail.png`
        },
        {
            title: 'Endless Runner',
            desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, commodi maiores obcaecati consequuntur et odit! Ad saepe voluptate ipsum in, dolor veritatis perspiciatis dolores pariatur illo repudiandae esse atque deserunt?
                        Quidem, odit exercitationem, placeat quod ut natus architecto atque, delectus asperiores eaque sint molestiae distinctio temporibus deleniti sed iure ex. Maiores corporis deserunt voluptate aliquid pariatur officiis sint adipisci fugiat.`,
            thumbnailPath: `${process.env.PUBLIC_URL}/projects/games/EndlessRunner/thumbnail.png`
        }
    ]

    return (
        <div className="main">
            <Header title="Projects" subtitle="" />
            <NavLinks links={navLinks} />
            <Content contentDescription="You can take a look at some of the projects I've worked on here!">
                <ProjectListing projects={projects} />
            </Content>
        </div>
    )
}

export default Projects
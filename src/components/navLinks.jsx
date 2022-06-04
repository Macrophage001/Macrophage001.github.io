import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faGithubSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';

import '../App.css'

const NavLinks = ({ links }) => (
    <div className='navLinks'>
        <nav>
            <ul>
                {links && links.map((link, i) => <li key={i}><Link to={link.link}>{link.title}</Link></li>)}
            </ul>
        </nav>
        <nav>
            <ul>
                <li>
                    <a href="https://twitter.com/Macrophage001">
                        <FontAwesomeIcon icon={faTwitterSquare} className='socialIcon' />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Macrophage001">
                        <FontAwesomeIcon icon={faGithubSquare} className='socialIcon' />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/dchampen4669/">
                        <FontAwesomeIcon icon={faInstagramSquare} className='socialIcon' />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
)

export default NavLinks;
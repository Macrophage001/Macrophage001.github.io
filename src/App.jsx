import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';

import { Link } from 'react-router-dom';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './styles/App.css';

import Header from './components/header';
import NavLinks from './components/navLinks';
import Content from './components/content';

import { tryCatch, generateUUID } from './utils/util';

const navLinks = [
	{ link: '/', title: 'Home' },
	{ link: "#", title: "Tags" },
	{ link: "#", title: "Contact" },
	{ link: "/projects", title: "Projects" },
	{ link: "/About", title: "About" },
	{ link: "/submit", title: <FontAwesomeIcon icon={faPlusSquare} /> },
]

function App() {
	const [posts, setPosts] = useState([])

	const loadPosts = () => {
		tryCatch(async () => {
			let resp = await axios.get('/posts');
			console.log(resp);
			setPosts(resp.data.reverse());
		})();
	}

	useEffect(() => {
		loadPosts()
	}, []);

	return (
		<div className="main">
			<Header title="Darnell Champen" subtitle="Independant Game Developer | Freelance Web Developer" />
			<NavLinks links={navLinks} />
			<Content contentDescription="">
				<div className="posts">
					{posts && posts.map(post => (
						<div key={generateUUID(post.title)} className="post-preview">
							<h3>{post.title}</h3>
							<nav>
								<ul>
									{post.tags && post.tags.map(tag => (
										<li key={generateUUID(tag)}><Link to="#">{`#${tag}`}</Link></li>
									))}
								</ul>
							</nav>
							<ReactMarkdown className='font-light'>{post.desc}</ReactMarkdown>
							<Link className='read-more' to="/post" state={{ post }}>Read &#8627;</Link>
						</div>
					))}
				</div>
			</Content >
		</div >
	);
}

export default App;

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './styles/App.css';

import Header from './components/header';
import NavLinks from './components/navLinks';
import Content from './components/content';

import tryCatch from './utils/util';

const navLinks = [
	{ link: "#", title: "Tags" },
	{ link: "#", title: "Contact" },
	{ link: "/projects", title: "Projects" },
	{ link: "/About", title: "About" },
	{ link: "/submit", title: <FontAwesomeIcon icon={faPlusSquare} /> },
]

const useInitPosts = () => {
	const [posts, setPosts] = useState([])

	const loadPosts = () => {
		tryCatch(async () => {
			let resp = await axios.get('/posts');
			setPosts(resp.data);
		});
	}

	useEffect(() => {
		loadPosts()
	}, [])
	return posts;
}

function App() {
	const posts = useInitPosts();

	return (
		<div className="main">
			<Header title="Darnell Champen" subtitle="Independant Game Developer | Freelance Web Developer" />
			<NavLinks links={navLinks} />
			<Content contentDescription="">
				<div className="posts">
					{posts && posts.map((post, i) => (
						<div className="post-preview">
							<h3>{post.title}</h3>
							<nav>
								<ul>
									{post.tags && post.tags.map((tag, i) => (
										<li><Link to="#">{`#${tag}`}</Link></li>
									))}
								</ul>
							</nav>
							<p className='font-light'>{post.desc}</p>
							<Link to="#">Read &#8627;</Link>
						</div>
					))}
				</div>
			</Content>
		</div>
	);
}

export default App;

import React from 'react';
import Header from '../../Header/Header';
import Posts from '../../Posts/Posts';
import Sidebar from '../../Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination';
import { axiosInstance } from '../../../config';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(6);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	console.log(currentPosts);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axiosInstance.get('/posts' + search);
			setPosts(res.data);
		};
		fetchPosts();
	}, [search]);
	return (
		<>
			<Header />
			<div className='home'>
				<div className='posts'>
					<Posts posts={currentPosts} />
					<div className='paginate-container'>
						<Pagination
							postsPerPage={postsPerPage}
							totalPosts={posts.length}
							paginate={paginate}
						/>
					</div>
				</div>

				<Sidebar />
			</div>
		</>
	);
}

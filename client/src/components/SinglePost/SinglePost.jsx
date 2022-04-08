import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';
import { axiosInstance } from '../../config';
//import { Link } from 'react-router-dom';

export default function SinglePost() {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState({});
	const PF = 'http://localhost:5000/images/';
	const { user } = useContext(Context);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [updateMode, setUpdateMode] = useState(false);
	const dateFormat = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	useEffect(() => {
		const getPost = async () => {
			const res = await axiosInstance.get('/posts/' + path);
			setPost(res.data);
			setTitle(res.data.title);
			setDesc(res.data.desc);
		};
		getPost();
	}, [path]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/posts/${post._id}`, {
				data: { username: user.username },
			});
			window.location.replace('/');
		} catch (error) {}
	};

	const handleUpdate = async () => {
		try {
			await axios.put(`/posts/${post._id}`, {
				username: user.username,
				title,
				desc,
			});
			setUpdateMode(false);
		} catch (error) {}
	};

	return (
		<div className='single-post'>
			<div className='single-post-wrapper'>
				{post.photo && (
					<img src={PF + post.photo} alt={title} className='single-post-img' />
				)}
				{updateMode ? (
					<input
						type='text'
						value={title}
						className='single-post-title-input'
						autoFocus
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className='single-post-title'>
						{title}
						{post.username === user?.username && (
							<div className='single-post-edit'>
								<i
									className='single-post-icon fa-solid fa-pen-to-square'
									onClick={() => setUpdateMode(true)}
								></i>
								<i
									className='single-post-icon fa-solid fa-trash-can'
									onClick={handleDelete}
								></i>
							</div>
						)}
					</h1>
				)}

				<div className='single-post-info'>
					<p className='single-post-author'>
						Author:
						<Link to={`/?user=${post.username}`}>
							<b>{post.username}</b>
						</Link>
					</p>
					<p className='single-post-date'>
						{new Date(post.createdAt).toDateString()}
					</p>
				</div>
				{updateMode ? (
					<textarea
						className='single-post-desc-input'
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
				) : (
					<p className='single-post-desc'>{desc}</p>
				)}
				{updateMode && (
					<button className='single-post-button' onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
}

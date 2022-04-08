import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
	const PF = 'https://react-blog-jjm.herokuapp.com/images/';
	//http://localhost:5000
	console.log(post.categories);
	return (
		<div className='post'>
			{post.photo && (
				<img className='postImg' src={PF + post.photo} alt={post.title} />
			)}

			<div className='post-info'>
				<div className='post-cats'>
					{post.categories.map((c) => (
						<h3 key={c._id} className='post-cat'>
							{c}
						</h3>
					))}
				</div>
				<Link to={`/post/${post._id}`}>
					<div className='post-title'>{post.title}</div>
				</Link>
				<h6 className='post-date'>{new Date(post.createdAt).toDateString()}</h6>
				<p className='post-desc'>{post.desc}</p>
			</div>
		</div>
	);
}

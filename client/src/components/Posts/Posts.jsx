import React from 'react';
import Post from '../Post/Post';

export default function Posts({ posts }) {
	return (
		<>
			{posts.map((p) => (
				<Post key={p._id} post={p} />
			))}
		</>
	);
}

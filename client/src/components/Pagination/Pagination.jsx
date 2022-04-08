import React from 'react';

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
	let pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	if (pageNumbers <= 1) {
		return (pageNumbers = []);
	}

	return (
		<div className='pagination'>
			{pageNumbers ? (
				<ul>
					{pageNumbers.map((number) => (
						<li key={number} className='page-item'>
							<a
								onClick={() => paginate(number)}
								href='#'
								className='page-link'
							>
								{number}
							</a>
						</li>
					))}
				</ul>
			) : (
				<ul></ul>
			)}
		</div>
	);
}

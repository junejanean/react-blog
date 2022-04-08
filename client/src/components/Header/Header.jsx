import React from 'react';

export default function Header() {
	return (
		<div className='header'>
			<div className='header-titles'>
				<div className='header-title-small'>React & Node</div>
				<div className='header-title-large'>Blog</div>
			</div>
			<img
				alt='by Guillaume Meurice from Pexels'
				className='header-img'
				src='https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg'
			></img>
		</div>
	);
}

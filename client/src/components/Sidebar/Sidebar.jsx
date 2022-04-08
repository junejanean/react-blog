import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';

export default function Sidebar() {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		const getCats = async () => {
			const res = await axiosInstance.get('/categories');
			setCats(res.data);
		};
		getCats();
	}, []);

	return (
		<div className='sidebar'>
			<div className='sidebar-item'>
				<h2 className='sidebar-title'>ABOUT ME</h2>
				<img src='https://images.pexels.com/photos/3727175/pexels-photo-3727175.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'></img>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
				</p>
			</div>
			<div className='sidebar-item'>
				<h2 className='sidebar-title'>CATEGORIES</h2>
				<ul className='sidebar-list'>
					{cats.map((c) => (
						<Link key={c._id} to={`/?cat=${c.name}`}>
							<li className='sidebar-list-item'>{c.name}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className='sidebar-item'>
				<h2 className='sidebar-title'>FOLLOW ME</h2>
				<div className='sidebar-social'>
					<i className='sidebar-icon fa-brands fa-twitter'></i>
					<i className='sidebar-icon fa-brands fa-linkedin-in'></i>
					<i className='sidebar-icon fa-brands fa-instagram'></i>
					<i className='sidebar-icon fa-brands fa-facebook-f'></i>
				</div>
			</div>
		</div>
	);
}

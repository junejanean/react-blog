import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './TopNav.css';

export default function TopNav() {
	const { user, dispatch } = useContext(Context);
	const PF = 'http://localhost:5000/images/';
	const avatar =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png';

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<div className='stickyNav'>
			<div className='topLeft'>
				<i className='fa-brands fa-twitter'></i>
				<i className='fa-brands fa-linkedin-in'></i>
				<i className='fa-brands fa-instagram'></i>
				<i className='fa-brands fa-facebook-f'></i>
			</div>
			<div className='topMid'>
				<ul className='top-nav'>
					<li className='top-nav-list'>
						<Link to='/'>HOME</Link>
					</li>
					<li className='top-nav-list'>
						<Link to='/About'>ABOUT</Link>
					</li>
					<li className='top-nav-list'>
						<Link to='/About'>CONTACT</Link>
					</li>
					<li className='top-nav-list'>
						<Link to='/Write'>WRITE</Link>
					</li>
					<li className='top-nav-list' onClick={handleLogout}>
						{user && 'LOGOUT'}
					</li>
				</ul>
			</div>
			<div className='topRight'>
				{user ? (
					<Link to='/settings'>
						<img
							alt='Profile pic'
							src={user.profilePic ? PF + user.profilePic : avatar}
						/>
					</Link>
				) : (
					<ul className='top-nav'>
						<li className='top-nav-list'>
							<Link to='/Login'>LOGIN</Link>
						</li>
						<li className='top-nav-list'>
							<Link to='/Register'>REGISTER</Link>
						</li>
					</ul>
				)}

				{/* <i className='search fa-solid fa-magnifying-glass'></i> */}
			</div>
		</div>
	);
}

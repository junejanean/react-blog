import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { axiosInstance } from '../../../config';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			const res = await axiosInstance.post('/auth/register', {
				username,
				email,
				password,
			});
			res.data && window.location.replace('/login');
		} catch (err) {
			setError(true);
		}
	};

	return (
		<div className='register'>
			<p className='register-title'>Register</p>
			<form onSubmit={handleSubmit} className='register-form'>
				<input
					type='text'
					placeholder='Username...'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Email...'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password...'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='register-login'>
					<Link to='/login'>Login</Link>
				</button>
				<button className='register-button' type='submit'>
					Register
				</button>
				{error && <p className='error'> Something went wrong!</p>}
			</form>
		</div>
	);
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { axiosInstance } from '../../../config';
import PasswordChecklist from 'react-password-checklist';

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');
	const [show, setShow] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

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

	const handleClick = () => {
		setIsDisabled(!isDisabled);
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
					onClick={() => {
						setShow(true);
						handleClick();
					}}
					onFocus={() => setShow(true)}
					//	onBlur={show ? () => setShow(false) : () => setShow(true)}
				/>
				<input
					type='password'
					placeholder='Retype password...'
					onChange={(e) => setPasswordAgain(e.target.value)}
					disabled={isDisabled}
				></input>
				{show && (
					<PasswordChecklist
						rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
						minLength={4}
						value={password}
						valueAgain={passwordAgain}
						onChange={(isValid) => {}}
					/>
				)}
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

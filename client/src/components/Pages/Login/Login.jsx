import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../config';
import { Context } from '../../../context/Context';
import './Login.css';

export default function Login() {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			const res = await axiosInstance.post('/auth/login', {
				username: userRef.current.value,
				password: passwordRef.current.value,
			});
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
		} catch (error) {
			console.log(error.message);
			dispatch({ type: 'LOGIN_FAILURE' });
			setError(error.message);
		}
	};

	return (
		<div className='login'>
			<p className='login-title'>Login</p>
			<form className='login-form' onSubmit={handleSubmit}>
				<input type='text' placeholder='Username...' ref={userRef} />
				<input type='password' placeholder='Password...' ref={passwordRef} />
				<button type='submit' className='login-button' disabled={isFetching}>
					Login
				</button>
				<button className='login-register'>
					<Link to='/register'>Register</Link>
				</button>
				{error && <p className='error'>{error}</p>}
			</form>
		</div>
	);
}

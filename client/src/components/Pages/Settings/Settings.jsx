import Sidebar from '../../Sidebar/Sidebar';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../context/Context';
import { axiosInstance } from '../../../config';

export default function Settings() {
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);

	const { user, dispatch } = useContext(Context);
	const PF = 'http://localhost:5000/images/';
	const avatar =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png';

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user.password);
		dispatch({ type: 'UPDATE_START' });
		const updatedUser = {
			userId: user._id,
			username: username ? username : user.username,
			email: email ? email : user.email,
			password,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append('name', filename);
			data.append('file', file);
			updatedUser.profilePic = filename;
			try {
				await axios.post('/upload', data);
			} catch (err) {}
		}
		try {
			const res = await axiosInstance.put('/users/' + user._id, updatedUser);
			setSuccess(true);
			dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
		} catch (err) {
			dispatch({ type: 'UPDATE_FAILURE' });
		}
	};

	return (
		<div className='settings'>
			<div className='settings-wrapper'>
				<div className='settings-title'>
					<p className='settings-update-title'>Update Your Account</p>
					<p className='settings-delete-title'>Delete Account</p>
				</div>
				<form className='settings-form' onSubmit={handleSubmit}>
					<label>Profile Picture</label>
					<div className='settings-pp'>
						<img
							src={file ? URL.createObjectURL(file) : PF + user.profilePic}
							//src={user.profilePic ? PF + user.profilePic : avatar}
							alt=''
						/>
						<label htmlFor='fileInput'>
							<i className='settings-pp-icon fa-solid fa-user'></i>
						</label>
						<input
							type='file'
							id='fileInput'
							style={{ display: 'none' }}
							onChange={(e) => setFile(e.target.files[0])}
						></input>
					</div>
					<label>Username</label>
					<input
						type='text'
						defaultValue={user.username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email</label>
					<input
						type='email'
						defaultValue={user.email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit' className='settings-submit'>
						Update
					</button>
					{success && <p className='success'>Profile has been updated!</p>}
				</form>
			</div>
			<Sidebar />
		</div>
	);
}

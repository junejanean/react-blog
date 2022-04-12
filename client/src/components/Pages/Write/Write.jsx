import axios from 'axios';
import { useContext, useState } from 'react';
import { axiosInstance } from '../../../config';
import { Context } from '../../../context/Context';

export default function Write() {
	const [title, setTitle] = useState('');
	const [categories, setCategory] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios.post('/posts');
		const newPost = {
			username: user.username,
			title,
			categories,
			desc,
		};
		// const endpoints = ['/posts', '/categories'];
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append('name', filename);
			data.append('file', file);
			newPost.photo = filename;
			try {
				await axios.post('/upload', data);
			} catch (err) {}
		}
		try {
			const res = await axiosInstance.post('/posts', newPost);
			window.location.replace('/post/' + res.data._id);
			console.log(res);
		} catch (error) {}
	};
	// trying make 2 different posts (posts & categories)
	// try {
	// 	const res = await Promise.all(
	// 		endpoints.map((endpoint) => axiosInstance.post(endpoint, newPost))
	// 	);
	// 	window.location.replace('/post/' + res.data._id);
	// 	console.log(res);
	// } catch (error) {}

	return (
		<div className='write'>
			<div className='write-img'>
				{file && <img src={URL.createObjectURL(file)} alt='' />}
			</div>
			<form className='write-form' onSubmit={handleSubmit}>
				<div className='write-form-group'>
					<div className='title-wrapper'>
						<label htmlFor='fileInput'>
							<i className='write-icon fa-solid fa-plus'></i>
							<span>Upload photo</span>
						</label>
						<input
							type='file'
							id='fileInput'
							style={{ display: 'none' }}
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<input
							type='text'
							placeholder='Title'
							className='write-input'
							autoFocus={true}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Category'
							className='category-input'
							autoFocus={true}
							onChange={(e) => setCategory(e.target.value)}
						/>
					</div>
				</div>
				<div className='write-form-group'>
					<textarea
						placeholder='Tell your story...'
						type='text'
						className='write-input write-text'
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				</div>
				<button type='submit' className='write-submit'>
					Publish
				</button>
			</form>
		</div>
	);
}

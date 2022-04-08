import axios from 'axios';
import { useContext, useState } from 'react';
import { axiosInstance } from '../../../config';
import { Context } from '../../../context/Context';

export default function Write() {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios.post('/posts');
		const newPost = {
			username: user.username,
			title,
			desc,
		};
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
		} catch (error) {}
	};

	return (
		<div className='write'>
			<div className='write-img'>
				{file && <img src={URL.createObjectURL(file)} alt='' />}
			</div>
			<form className='write-form' onSubmit={handleSubmit}>
				<div className='write-form-group'>
					<label htmlFor='fileInput'>
						<i class='write-icon fa-solid fa-plus'></i>
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
						autofocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
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

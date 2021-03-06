import { useContext, useState } from 'react';
import { axiosInstance } from '../../../config';
import { Context } from '../../../context/Context';
import './Write.css';

export default function Write() {
	const [title, setTitle] = useState('');
	const [categories, setCategory] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = [
			{
				endpoint: '/posts',
				data: {
					username: user.username,
					title,
					categories,
					desc,
					photo: file !== null && Date.now() + file.name,
				},
			},
			{
				endpoint: '/categories',
				data: {
					name: categories,
				},
			},
		];
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append('name', filename);
			data.append('file', file);
			try {
				await axiosInstance.post('/upload', data);
			} catch (err) {}
		}
		try {
			//  making two different posts (posts & categories)
			const res = await Promise.all(
				payload.map((d) => axiosInstance.post(d.endpoint, d.data))
			);
			console.log(res);
			window.location.replace('/post/' + res[0].data._id);
		} catch (error) {}
	};

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

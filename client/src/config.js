import axios from 'axios';

export const axiosInstance = axios.create({
	// baseURL: 'https://react-blog-jjm.herokuapp.com/api',
	baseURL: process.env.REACT_APP_BASEURL,
});

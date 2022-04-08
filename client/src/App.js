import './styles.css';
import TopNav from './components/TopNav/TopNav';
import Home from './components/Pages/Home/Home';
import Single from './components/Pages/Single/Single';
import Write from './components/Pages/Write/Write';
import Settings from './components/Pages/Settings/Settings';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
	const { user } = useContext(Context);
	return (
		<BrowserRouter>
			<TopNav />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Register' element={user ? <Home /> : <Register />} />
				<Route path='/Login' element={user ? <Home /> : <Login />} />
				<Route path='/Write' element={user ? <Write /> : <Login />} />
				<Route path='/Settings' element={user ? <Settings /> : <Login />} />
				<Route path='/Post/:postId' element={<Single />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

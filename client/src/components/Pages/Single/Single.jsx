import Sidebar from '../../Sidebar/Sidebar';
import SinglePost from '../../SinglePost/SinglePost';

export default function Single() {
	return (
		<div className='single'>
			<SinglePost />
			<Sidebar />
		</div>
	);
}

import Header from '../templates/Header';
import Home from '../Pages/Home';
import Character from '../Pages/Chacaracters';
import Error404 from '../Pages/Error404';
import getHash from '../Utils/getHash';
import resolveRoutes from '../Utils/resolveRoutes';

const routes = {
	'/': Home,
	'/:id': Character,
	'/contact': 'Contact', 
};

const router = async () => {
	const header = null || document.getElementById('header');
	const content = null || document.getElementById('content');

	header.innerHTML = await Header();
	let hash = getHash();
	let route = await resolveRoutes(hash);
	let render = routes[route] ? routes[route] : Error404;
	content.innerHTML = await render(); 
	
};
export default router;

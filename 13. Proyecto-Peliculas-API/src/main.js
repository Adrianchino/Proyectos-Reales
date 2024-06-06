// Estamos usando la libreria axios para simplificar como por ejemplo los header, el api key. A base de esto podemos llamar a las siguientes funciones.

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

// UTILS para tener limpio el html e ingresar la informacion

function createMovies(movies, container) {
	container.innerHTML = '';

	movies.forEach((movie) => {  // Mencionamos el movie para hacer un foreach e imporat los datos
		
		// Creamos clases y etiquetas para agregar los datos de la API 
		const movieContainer = document.createElement('div');
		movieContainer.classList.add('movie-container');
		movieContainer.addEventListener('click', () => {
			location.hash = '#movie=' + movie.id;
		});

		const movieImg = document.createElement('img');
		movieImg.classList.add('movie-img');
		movieImg.setAttribute('alt', movie.title);
		movieImg.setAttribute('src', 'http://image.tmdb.org/t/p/w300' + movie.poster_path); // Aqui estamos agregando la etiqueta donde va air la imagen y colocando poster_path que sale de la Api	que seria una imagen

		movieContainer.appendChild(movieImg); // Aqui ya le estamos insertando los datos 
		container.appendChild(movieContainer); // Esta llendo directo al html con los correspondidos


	});
}

function createCategories(categories, container) {
	container.innerHTML = '';

	categories.forEach((category) => {  // Mencionamos el categories para hacer un foreach e imporat los datos
		const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');  //Creamos el categoriesPreviewList y agregamos del html

		// Creamos clases y etiquetas para agregar los datos de la API 
		const categoryContainer = document.createElement('div');
		categoryContainer.classList.add('category-container');

		const categoryTitle = document.createElement('h3');
		categoryTitle.classList.add('category-title');
		categoryTitle.setAttribute('id', 'id' + category.id);
		categoryTitle.addEventListener('click', () => {
			location.hash = `#category=${category.id}/${category.name}`;
		})
		const categoryTitleText = document.createTextNode(category.name);

		categoryTitle.appendChild(categoryTitleText);  // Aqui ya le estamos insertando los datos 
		categoryContainer.appendChild(categoryTitle);  // Aqui ya le estamos insertando los datos 
		container.appendChild(categoryContainer); // Esta llendo directo al html con los correspondidos

	});
}


// LLAMADOS A LOS APIS

// Creamos un async para llamar nuestra API, Esta en otro archivo para mantenerlo en secreto, Esta es la parte de Tendencias

async function getTrendingMoviesPreview() {

	/* En esta manera usamos la libreria axios
	const { data } = await api('trending/movie/day');
	const movies = data.results;
	 */

	const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
	const data = await res.json();
	const movies = data.results; // creamos un movie para llamar la data

	createMovies(movies, trendingMoviesPreviewList); // Una forma mas simplificada

}


async function getCategoriesPreview() {

	/* En esta manera usamos la libreria axios
	const { data } = await api('genre/movie/list');
	const categories = data.genres;
	 */

	const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
	const data = await res.json();
	const categories = data.genres; // creamos una categories para llamar la data

	createCategories(categories, categoriesPreviewList); // Una forma mas simplificada
}


async function getMoviesByCategory(id) {

	//En esta manera usamos la libreria axios
	const { data } = await api('discover/movie', {
		params: {
			with_genres: id,
		},
	});
	const movies = data.results;

	createMovies(movies, genericSection);
	

	/* const res = await fetch('https://api.themoviedb.org/3/discover/movie,api_key=' + API_KEY);
	const data = await res.json();
	const movies = data.results; // creamos un movie para llamar la data */

}


async function getMoviesBySearch(query) {

	//En esta manera usamos la libreria axios
	const { data } = await api('search/movie', {
		params: {
			query,
		},
	});
	const movies = data.results;

	createMovies(movies, genericSection);
	

	/* const res = await fetch('https://api.themoviedb.org/3/discover/movie,api_key=' + API_KEY);
	const data = await res.json();
	const movies = data.results; // creamos un movie para llamar la data */

}


async function getTrendingMovies() {

	/* En esta manera usamos la libreria axios
	const { data } = await api('trending/movie/day');
	const movies = data.results;
	 */

	const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
	const data = await res.json();
	const movies = data.results; // creamos un movie para llamar la data

	createMovies(movies, genericSection); // Una forma mas simplificada

}


async function getMovieById(id) {

	//En esta manera usamos la libreria axios
	const { data: movie } = await api('movie/' + id);
	

	/* const res = await fetch('https://api.themoviedb.org/3/movie + id?api_key=' + API_KEY);
	const data = await res.json();
	const movies = data.results; // creamos un movie para llamar la data */

	const movieImgUrl = 'http://image.tmdb.org/t/p/w500' +  movie.poster_path;
	headerSection.style.background = `
	linear-gradient(
		180deg,
		rgba(0, 0, 0, 0.35) 19.27%,
		rgba(0, 0, 0, 0) 29.17%
	),
	url(${movieImgUrl})
	`;
	
	movieDetailTitle.textContent = movie.title;
	movieDetailDescription.textContent = movie.overview;
	movieDetailScore.textContent = movie.vote_average;

	createCategories(movie.genres, movieDetailCategoriesList)
	getRelateMoviesId(id)
}


async function getRelateMoviesId(id) {
	const { data } = await api(`movie/${id}/recommendations`);
	const relateMovies = data.results;

	createMovies(relateMovies, relatedMoviesContainer);
}

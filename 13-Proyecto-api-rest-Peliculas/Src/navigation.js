searchFormBtn.addEventListener("click", () => {
	location.hash =`#search=${searchFormInput.value.trim()}`;
})

trendingBtn.addEventListener("click", () => {
	location.hash = '#trends'
})

arrowBtn.addEventListener("click", () => {
	window.history.back();
})



window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

	window.scrollTo(0, 0);
}

function homePage() {
  console.log("Home!!!");

	//Manejo en la parte del header
	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.add('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.remove('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	// Manejo en la parte de Secciones que es tendencias y categorias
	trendingPreviewSection.classList.remove('inactive');
	categoriesPreviewSection.classList.remove('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoriesPage() {
  console.log("Categories!!!");

	//Manejo en la parte del header
	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	// Manejo en la parte de Secciones que es tendencias y categorias
	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	//Devuelve unn array => ['#Category', 'id-name']
	const [_, categoryData] = location.hash.split('=');
	const [categoryId, categoryName] = categoryData.split('/');
	const newName = categoryName.replace('%20', ' ');

	headerCategoryTitle.innerHTML = newName; // Le estamos agregandoun titulo a cada vex que entramos al genero

	getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log("Movie!!!");

	//Manejo en la parte del header
	headerSection.classList.add('header-container--long');
	// headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.add('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.add('inactive');

	// Manejo en la parte de Secciones que es tendencias y categorias
	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.remove('inactive');

	//Devuelve unn array => ['#movie', 'id']
	const [_, movieId] = location.hash.split('=');
	getMovieById(movieId); 
	
}

function searchPage() {
  console.log("Search!!!");

	//Manejo en la parte del header
	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	// Manejo en la parte de Secciones que es tendencias y categorias
	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');


	//Devuelve unn array => ['#Search', 'Buscado']
	const [_, query] = location.hash.split('=');
	getMoviesBySearch(query);
}

function trendsPage() {
  console.log("Trends!!!");

	//Manejo en la parte del header
	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	// Manejo en la parte de Secciones que es tendencias y categorias
	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	headerCategoryTitle.innerHTML = 'Tendencias';

	getTrendingMovies();
}

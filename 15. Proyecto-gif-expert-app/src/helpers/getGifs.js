
export const getGifs = async( category ) => {
	const url = `https://api.giphy.com/v1/gifs/search?api_key=wOOcMRqK5NOZ8JQm6aYxtZ5cYQ0qh1hH&q=${ category }&limit=10`

	try {

		const resp = await fetch(url);
		const { data } = await resp.json();
		const gifs = data.map( img => ({
		
		id: img.id,
		title: img.title,
		url: img.images.downsized_medium.url

		}));

		return gifs;
	
		
	} catch (error) {
		console.error('Error fetching gifs:', error);
        return [];
	}
	
	
}
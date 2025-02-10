import { useState } from "react";
import { AddCategory, GifGrid } from "./Components";

export const GifExpertApp = () => {

	const [ categories, setCategories ] = useState([ 'One Punch' ]);

	const onAddCategory = (newCategory) => {

		// En esta linea haremos para que la palabra sea mayusucula o minuscula no se vuelva a repetir 

		const normalizedNewCategory = newCategory.trim().toLowerCase();

		// Verificamos si ya existe la category

		const CategoryExists = categories.some(
			category => category.trim().toLowerCase() === normalizedNewCategory
		);

		// En esa linea hacemos para que la palabra no se repita en la lista de categories y vuelva a escribir 
		if( CategoryExists ) {

			alert(`La palabra ${newCategory} ya existe, introduzca una nueva palabra`);

			return;
		} 

		setCategories([ newCategory, ...categories]); 
	}
	

	return (
		<>
				{/* Titulo */}
				<h1>GifExpertApp</h1>

				{/* Input */}
				<AddCategory 
						// setCategories={setCategories} 
						onNewCategory = { onAddCategory}

				/>

				{/* Listado del Gif */}
			
					{ 
						categories.map( category => 
							(
								<GifGrid 
									key={ category } 
									category={ category }		
								/>
							)) 
						}

						{/* Gif de item */}
		</>
	)
}


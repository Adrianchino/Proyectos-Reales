import React, { useState } from 'react'


export const AddCategory = ({ onNewCategory }) => {

	const [ inputValue, setInputValue ] = useState();

	const onInputChange = ({ target }) => {
		setInputValue( target.value );
	}

	const onSubmit = (event) => {
		event.preventDefault();
		
		// Esta linea se refiere a no hacer enter a espacios en blanco y que no se permita 1 caracter 
		if( inputValue.trim().length <=1 ) return;

		// setCategories( categories => [ inputValue, ...categories ] );
		setInputValue(''); // Despus de hacer enter, lo que estubo escrito se borra
		onNewCategory( inputValue.trim() );
	}

	return (
		<form onSubmit={ onSubmit }>

			<input 
					type="text" 
					placeholder='Buscar Gifs'
					value={ inputValue || "" }
					onChange={ onInputChange }
			/>

		</form>
	)
}


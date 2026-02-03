import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Grid, Button, TextField, Typography, IconButton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from "../Components/ImageGallery";
import { useForm } from "../../Hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../Store/Journal"
import { useRef } from "react";

export const NoteView = () => {

	const dispatch = useDispatch();

	const { active: note, messageSaved, isSaving } = useSelector( state => state.journal )

	const { body, title, date, onInputChange, formState  } = useForm( note )

	const dateString = useMemo(() => {

		const newDate = new Date( date )
		return newDate.toUTCString()

	}, [date])

	const fileInputRef = useRef();

	useEffect(() => {
		dispatch( setActiveNote(formState) )
	
	}, [formState])

	useEffect(() => {
		if( messageSaved.length > 0 ) {
			Swal.fire( 'Nota Actualizada', messageSaved, 'success' )
		}
	}, [messageSaved])
	

	const onSaveNote = () =>{
		dispatch( startSaveNote() );
	}

	const onFileInputChange = ({ target }) => {
		if ( target.file === 0 ) return;

		dispatch( startUploadingFiles( target.files ) )
	}

	const onDelete = () => {
		dispatch( startDeletingNote() );
	}
	

	return (
		<>
			<Grid container  
				justifyContent='space-between'
				alignItems='center' 
				sx={{
					mb: 1
				}}
				className="animate__animated animate__fadeIn animate__faster"
			>
			<Grid item>
				<Typography fontSize={39} fontWeight='Light' variant="h5">
					{ dateString }
				</Typography>
			</Grid>

			<Grid >

				<input 
					type="file"
					multiple
					ref={ fileInputRef }
					onChange={ onFileInputChange }
					style={{display: 'none' }}
				/>

				<IconButton color="primary" disabled={ isSaving } onClick={ () => fileInputRef.current.click() }>
					<UploadOutlined />
				</IconButton>

				<Button color="primary" sx={{ p: 1 }}
					onClick={ onSaveNote } disabled= { isSaving }
				>
					<SaveOutlined sx={{ mr: 1, fontSize: 25 }}/>
					Guardar
				</Button>
			</Grid>
		</Grid>
		<Grid container sx={{ flexGrow: 1, mt: 3 }}>
				<TextField 
					type="text"
					variant="filled"
					fullWidth
					placeholder="Ingrese un titulo"
					label="Titulo"
					sx={{
						border: 'none',
						mb: 1
					}}
					name="title"
					value={ title }
					onChange={ onInputChange }
				/>  
				<TextField 
					type="text"
					variant="filled"
					fullWidth
					multiline
					placeholder="¿que sucedio hoy?"
					label="Descripcion"
					minRows={4}
					name="body"
					value={ body }
					onChange={ onInputChange }
				/>
			</Grid>

			<Grid container justifyContent='end'>
					<Button
						onClick={ onDelete }
						sx={{ mt: 2 }}
						color="error"
					>
						<DeleteOutline />
					</Button>
			</Grid>
			<ImageGallery 
				images={ note.imageUrls }
			/>
		</>
	)
}
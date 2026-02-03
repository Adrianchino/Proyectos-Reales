
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../Firebase/config"
import {  addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote, deleteNoteById } from "./JournalSlice";
import { loadNotes } from "../../Helpers/loadNotes";
import { fileUpload } from "../../Helpers/fileUpload";


export const startNewNot = () =>{
	return async ( dispatch, getState ) => {

		dispatch( savingNewNote() )
		
		const { uid } = getState().auth;

		const newNote = {
			title: '',
			body: '',
			imageUrls: [],
			date: new Date().getTime(),
		}

		const newDoc = doc( collection( FireBaseDB, `${ uid }/journal/notes` ) )
		await setDoc( newDoc, newNote );

		newNote.id = newDoc.id;

		//! dispatch

		dispatch( addNewEmptyNote( newNote ) )
		dispatch( setActiveNote( newNote ) )
		
	}

}

export const starLoadingNotes = () => {
	return async(dispatch, getState) =>{
		const { uid } = getState().auth;

		if( !uid ) throw new Error('El UID del usuario no existe')

		const notes = await loadNotes( uid );

		dispatch( setNotes( notes ) );
	}
}

export const startSaveNote = () =>{
	return async( dispatch, getState ) =>{

		dispatch( setSaving() );

		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;

		const docRef = doc( FireBaseDB, `${ uid }/journal/notes/${ note.id }` );
		await setDoc( docRef, noteToFireStore, { merge: true } )
		
		dispatch( updateNote( note ) );
	}
}


export const startUploadingFiles = ( files = [] ) => {
	return async( dispatch ) => {
		dispatch( setSaving() );

		// await fileUpload( files[0] )

		const fileUploadPromises = [];

		for (const file of files) {
			fileUploadPromises.push( fileUpload( file ) );
		}

		const photosUrls = await Promise.all( fileUploadPromises )

		dispatch( setPhotosToActiveNote( photosUrls ) );
	}
}

export const startDeletingNote = () => {
	return async( dispatc, getState ) => {

		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const docRef = doc( FireBaseDB, `${ uid }/journal/notes/${ note.id }` )
		const resp = await deleteDoc( docRef );

		dispatc(deleteNoteById(note.id));
	}
}
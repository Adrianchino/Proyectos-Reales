import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Auth'
import { journalSlice } from './Journal/JournalSlice'

export const store = configureStore({
  reducer: {
		auth: authSlice.reducer,
		journal: journalSlice.reducer,
	},
})
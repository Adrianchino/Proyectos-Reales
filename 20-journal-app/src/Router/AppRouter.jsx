import { Navigate, Route, Routes } from "react-router"
import { AuthRoutes } from "../Auth/Routes/AuthRoutes"
import { JournalRoutes } from "../Journal/Routes/JournalRoutes"
import { CheckingAuth } from "../UI"

import { useCheckAuth } from "../Hooks"

export const AppRouter = () => {

	const { status } = useCheckAuth()
	
	if ( status === 'checking' ) {
		return <CheckingAuth />
	}

	return (
		<Routes>

			{
				status === 'authenticated'
				? <Route path="/*" element={<JournalRoutes/>}/>
				: <Route path="/auth/*" element={<AuthRoutes/>}/>
			}

			<Route path="/*" element={ <Navigate to='/auth/login' /> } />

			{/* Loginn y Regitre */}
			{/* <Route path="/auth/*" element={<AuthRoutes/>}/> */}

			{/* JournalApp */}
			{/* <Route path="/*" element={<JournalRoutes/>}/> */}

		</Routes>
	)
}
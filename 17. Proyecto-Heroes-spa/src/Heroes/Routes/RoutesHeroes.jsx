
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../Ui'
import { DcPage, HeroesPage, MarvelPage, SearchPage } from '../Pages'

export const RoutesHeroes = () => {
	return (
		<>

			<Navbar/>

			<Routes>
        <Route path="marvel" element={<MarvelPage />} />
        <Route path="dc" element={<DcPage />} />


        <Route path="search" element={<SearchPage />} />
        <Route path="hero/:id" element={<HeroesPage />} />

        
				<Route
          path="/"
          element={<Navigate to="/marvel" />}
        />
      </Routes>

		</>
	)
}

import { Route, Routes } from "react-router";

import { LoginPage } from "../auth";
import { RoutesHeroes } from "../Heroes";

export const AppRouter = () => {
	return (
		<>

      <Routes>

        <Route path="login" element={ <LoginPage /> } />
       
			  <Route path="/*" element={ <RoutesHeroes/> } />
        
      </Routes>
    </>
	)
}

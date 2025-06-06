import { HeroCard } from "../Components/HeroCard";
import queryString from "query-string";
import { useForm } from "../../Hooks/useForm"
import { useLocation, useNavigate } from "react-router-dom";
import { getHeroesByName } from '../Helpers'
0
export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );
  const heroes = getHeroesByName( q );

  const showSearch = ( q.length === 0 )
  const showError = ( q.length > 0 ) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if(searchText.trim().length <= 1 ) return;

    navigate(`?q=${ searchText }`);

  }

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">

         <div className="col-5">
        <h4 className="mt-4">Searching</h4>
        <form onSubmit={ onSearchSubmit } >
          <input 
            type="text"
            placeholder="Search a hero"
            className="form-control mt-4"
            name="searchText"
            autoComplete="off"
            value={ searchText }
            onChange={ onInputChange }
          />

          <button className="btn btn-outline-primary mt-3">
              Search
          </button>
        </form>
      </div>

      <div className="col-7 mt-5">
        <h4>Results</h4>

       {/*  {
          ( q === '' )
          ? <div className="alert alert-primary">Search a Hero</div>
          : ( heroes.length === 0 ) 
          && <div className="alert alert-danger">No Hero With <b> { q } </b></div>
        } // Otra forma mas ordenada de hacerlo */ }

        <div className="alert alert-primary  animate__animated animate__fadeIn" style={{ display: showSearch  ? '' : 'none' }}>
          Search a Hero 
        </div>

        <div className="alert alert-danger  animate__animated animate__fadeIn" style={{ display: showError ? '' : 'none' }}>
          No Hero With <b> { q } </b>
        </div>

        {
          heroes.map( hero => (
            <HeroCard key={ hero.id } {...hero} />
          ))
        }

      </div>

      </div>
    </>
  );
};

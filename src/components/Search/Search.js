import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//This is our 'main' component where you can search repositories
function Search() {
  //Creating variables for our controlled inputs (filters and sorts) and state
  //Lazy loading our initial state so we don't call getItem after every re-render
  //Using local storage to maintain previous inputs and results when going to details and coming back
  const [repoItems, setRepoItems] = useState(
    () => JSON.parse(window.localStorage.getItem("repoItems")) || []
  );
  const [language, setLanguage] = useState(
    () => JSON.parse(window.localStorage.getItem("language")) || ""
  );
  const [query, setQuery] = useState(
    () => JSON.parse(window.localStorage.getItem("query")) || ""
  );
  const [sort, setSort] = useState(
    () => JSON.parse(window.localStorage.getItem("sort")) || "default"
  );

  //Let react rerender whenever these vars update
  useEffect(() => {
    window.localStorage.setItem("repoItems", JSON.stringify(repoItems));
  }, [query, sort, language, repoItems]);

  //Build our query string and make the call to Git Hub's REST API
  async function queryRepos() {
    const languageString = language.length > 1 ? `+language:${language}` : ``;
    const sortString = sort === `stars` ? `&sort=stars` : ``;
    if (query.length > 0) {
      await axios
        .get(
          `https://api.github.com/search/repositories?q=${query}${languageString}${sortString}`
        )
        .then(({ data }) => data)
        .then(({ items }) => setRepoItems(items))
        .catch((error) => console.log(`An error has ocurred: ${error}`));
    }
  }

  //Handlers for input changes, dropdown changes and search button
  function onQueryChange(event) {
    const { value } = event.target;
    window.localStorage.setItem("query", JSON.stringify(value));
    setQuery(value);
  }
  function onSortChange(event) {
    const { value } = event.target;
    window.localStorage.setItem("sort", JSON.stringify(value));
    setSort(value);
  }
  function onLanguageChange(event) {
    const { value } = event.target;
    window.localStorage.setItem("language", JSON.stringify(value));
    setLanguage(value);
  }
  function onSearch() {
    queryRepos();
    console.log(repoItems);
  }

  //Map query results to a JSX list to include Repo Name and # of stars
  const repoList = repoItems.map(
    ({
      name,
      id,
      html_url,
      stargazers_count,
      description,
      owner,
      language,
      created_at,
    }) => (
      <li
        id={id}
        key={id}
        className='list-group-item d-flex justify-content-between'
      >
        <Link
          className='text-capitalize'
          to={{
            pathname: "/details",
            state: {
              name,
              id,
              html_url,
              stargazers_count,
              description,
              owner,
              language,
              created_at,
            },
          }}
        >
          {name}
        </Link>
        <span className='badge bg-primary rounded-pill align-self-end'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-star mx-2'
            viewBox='0 0 16 16'
          >
            <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
          </svg>
          {stargazers_count}
        </span>
      </li>
    )
  );

  //Building our form and query results
  return (
    <div className='repoList container p-4'>
      <div className='row g-2 justify-content-center d-flex text-center'>
        <h1 className='repoList_header'>Github Repo Search</h1>
        <input
          id='repoList_query'
          placeholder='Search Term'
          className='border bg-light form-control'
          value={query}
          onChange={onQueryChange}
        />
        <input
          className='repoList_filter border bg-light form-control'
          value={language}
          placeholder='Programming Language'
          onChange={onLanguageChange}
        />
        <select
          className='repoList_options border bg-light form-select'
          onChange={onSortChange}
          defaultValue={sort}
        >
          <option disabled hidden value='default'>
            Sort by...
          </option>
          <option className='repoList_option' value='best match'>
            Best Match
          </option>
          <option className='repoList_option' value='stars'>
            Stars
          </option>
        </select>
        <button
          type='button'
          className='btn btn-primary col-4'
          onClick={onSearch}
        >
          Search
        </button>
        <h2 className='mt-5'>Results</h2>
        <ul className='repoList_list list-group-flush'>
          {repoItems.length > 0
            ? repoList
            : "Search repositories by typing in the search box then clicking the 'Search' button!"}
        </ul>
      </div>
    </div>
  );
}

export default Search;

import "./Search.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

function Search() {
  const [repoItems, setRepoItems] = useState([]);
  const [language, setLanguage] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("best match");

  useEffect(() => {
    queryRepos();
    console.log(repoItems);
  }, [query, sort, language]);

  async function queryRepos() {
    console.log(language.length);
    const languageString = language.length > 1 ? `+language:${language}` : ``;
    const sortString = sort === `stars` ? `&sort=stars` : ``;
    if (query.length > 0) {
      await axios
        .get(
          `https://api.github.com/search/repositories?q=${query}${languageString}${sortString}`
        )
        .then(({ data }) => data)
        .then(({ items }) => setRepoItems(items));
    }
  }

  function onQueryChange(event) {
    const { value } = event.target;
    setQuery(value);
  }

  function onSortChange(event) {
    const { value } = event.target;
    setSort(value);
  }

  function onLanguageChange(event) {
    const { value } = event.target;
    setLanguage(value);
  }

  const repoList = repoItems.map(({ name, id, html_url, stargazers_count }) => (
    <li id={id}>
      <a href={html_url}>{name}</a>
      <span> ({stargazers_count} Stars)</span>
    </li>
  ));

  return (
    <div className='repoList'>
      <h1 className='repoList_header'>Github Repo Search</h1>
      <select
        className='repoList_options'
        onChange={onSortChange}
        defaultValue={"default"}
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
      <input
        value={language}
        placeholder='Filter by language...'
        onChange={onLanguageChange}
      />
      <input
        className='repoList_query'
        value={query}
        onChange={onQueryChange}
      />
      <ul className='repoList_list'>
        {query.length > 0
          ? repoList
          : "Search repositories by typing in the search box!"}
      </ul>
    </div>
  );
}

export default Search;

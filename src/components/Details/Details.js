import { Link, useLocation } from "react-router-dom";

//We are using the 'State' prop from our Link to pass necessary details for the clicked repository
//We get the passed state using the useLocation hook then destructing the desired vars
function Details() {
  const location = useLocation();
  const {
    name,
    html_url,
    stargazers_count,
    description,
    owner,
    language,
    created_at,
  } = location.state;

  //Return out details for the selected repository and include a back button to get back to search
  return (
    <div className='details container p-5'>
      <div className='row d-flex justify-content-center text-center'>
        <h1 className='details_header text-capitalize'>{name}</h1>
        <p className='mb-4'>{description}</p>
        <ul className='list-group-flush'>
          <li className='list-group-item'>
            <span style={{ fontWeight: "bold" }}>Author: </span>
            {owner.login}
          </li>
          <li className='list-group-item'>
            <span style={{ fontWeight: "bold" }}>Language: </span>
            {language}
          </li>
          <li className='list-group-item'>
            <a href={html_url}>Visit Repository</a>
          </li>
          <li className='list-group-item'>
            <span style={{ fontWeight: "bold" }}>Date Created: </span>
            {created_at}
          </li>
          <li className='list-group-item'>
            <span style={{ fontWeight: "bold" }}>Stars: </span>
            {stargazers_count}
          </li>
        </ul>
        <Link className='btn btn-danger col-4' to='/'>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Details;

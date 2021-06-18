import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search/Search";
import Details from "./components/Details/Details";
import NotFound from "./components/NotFound/NotFound";

function App() {
  //Define our react-router-dom routes
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Search />
        </Route>
        <Route exact path='/details'>
          <Details />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

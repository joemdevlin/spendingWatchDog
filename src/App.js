import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/HomeView";
import Breakdown from "./components/AgencyBreakdownView";
import History from "./components/HistoricalFundingView";
import State from "./components/StatesView";

import {Nav, Jumbotron} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Jumbotron>
          <h1>Spending Watch Dog</h1>
      </Jumbotron>
      <HashRouter>
        <Nav class="navbar navbar-expand-lg navbar-light bg-light" activeKey="/home" variant="tabs">
              <Nav.Item><NavLink class="nav-link" to="/">Home</NavLink></Nav.Item>
              <Nav.Item><NavLink class="nav-link" to="/states">State Funding</NavLink></Nav.Item>
              <Nav.Item><NavLink class="nav-link" to="/historical">Historical Funding</NavLink></Nav.Item>
              <Nav.Item><NavLink class="nav-link" to="/breakdown">Agency Breakdwon</NavLink></Nav.Item>
        </Nav>
        <main>
          <div id="content" >
            <Route exact path="/" component={Home}/>
            <Route path="/states" component={State}/>
            <Route path="/historical" component={History}/>
            <Route path="/breakdown" component={Breakdown}/>
          </div>
        </main>
      </HashRouter>
    </div>
  );
}

export default App;

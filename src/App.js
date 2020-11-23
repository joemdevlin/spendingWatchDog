import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import Home from "./components/HomeView";
import Breakdown from "./components/AgencyBreakdownView";
import History from "./components/HistoricalFundingView";
import State from "./components/StatesView";

import {Jumbotron} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Jumbotron>
          <h1>Spending Watch Dog</h1>
      </Jumbotron>
      <HashRouter>
        <div class="navbar navbar-expand-md navbar-dark bg-dark">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><Link class="nav-link" to="/">Home</Link></li>
            <li class="nav-item"><Link class="nav-link" to="/states">State Funding</Link></li>
            <li class="nav-item"><Link class="nav-link" to="/historical">Historical Funding</Link></li>
            <li class="nav-item"><Link class="nav-link" to="/breakdown">Agency Breakdown</Link></li>
          </ul>

        </div>
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

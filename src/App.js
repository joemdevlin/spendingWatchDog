import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/HomeView";
import Breakdown from "./components/AgencyBreakdownView";
import History from "./components/HistoricalFundingView";
import State from "./components/StatesView";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Spending Watch Dog</h1>
      </header>
      <HashRouter>
        <nav>
          <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/states">State Funding</NavLink></li>
              <li><NavLink to="/historical">Historical Funding</NavLink></li>
              <li><NavLink to="/breakdown">Agency Breakdwon</NavLink></li>
            </ul>
        </nav>
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

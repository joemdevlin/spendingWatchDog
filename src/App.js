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

import {Nav} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Spending Watch Dog</h1>
      </header>
      <HashRouter>
        <Nav expand="lg" className="justify-content-center" activeKey="/home" variant="tabs">
              <Nav.Item><NavLink to="/">Home</NavLink></Nav.Item>
              <Nav.Item><NavLink to="/states">State Funding</NavLink></Nav.Item>
              <Nav.Item><NavLink to="/historical">Historical Funding</NavLink></Nav.Item>
              <Nav.Item><NavLink to="/breakdown">Agency Breakdwon</NavLink></Nav.Item>
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

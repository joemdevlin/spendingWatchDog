import React, { Component } from 'react';
import stateImg from './img/state.png';
import historicalImg from './img/historical.png';
import agencyImg from './img/agency.png';
import debtImg from './img/debt.png';

class HomeView extends Component {
  // Wrapper for about section
  aboutWrapper() {
    return <div className="aboutWrap">
            <h2>About</h2>
            <br></br>
            <p>Our Spending Watch Dog site contains charts and graphs related to the categories of spending, 
              budgeting, funding, and debt of the United States. Selected this because we simply thought it would be 
              interesting to get a collective visual of the data. On this site, you will find graphs that will display funding by state, historical agency funding,
              agency funding, and overall debt.
            </p>
            <br></br><br></br>
          </div>
  }

  // Wrapper for state funding info div
  stateWrapper() {
    return <div className="stateWrap col-lg-3">
      <button type="button" onClick={(e) => {
          e.preventDefault();
          window.location.href='#/states';
          }}>
        <div className="homeDiv">
          <div className="homeTitle">
            <a className="homeTitleText" href="#/states">State Funding</a>
          </div>
          <div className="homeImg">
            <img className="stateImg" src={stateImg} alt="State Graph Icon"></img>
          </div>
          <div className="homeText">
            <p>This page will display total funding by state. All fifty states are listed onto one single circle
            chart so that funding be easily compared to other states.</p>
            <a className="homeClickText" href="#/states">CLICK TO VIEW GRAPH</a>
          </div>
        </div>
      </button>
    </div>
  }

  // Wrapper for historical funding info div
  historicalWrapper() {
    return <div className="historicalWrap col-lg-3">
      <button type="button" onClick={(e) => {
          e.preventDefault();
          window.location.href='#/historical';
          }}>
        <div className="homeDiv">
          <div className="homeTitle">
            <a className="homeTitleText" href="#/states">Historical Funding</a>
          </div>
          <div className="homeImg">
            <img className="historicalImg" src={historicalImg} alt="Historical Graph Icon"></img>
          </div>
          <div className="homeText">
            <p>An agency name could be searched to display the historical funding onto a line graph. 
              Each dollar is represented as millions and displays data within the past 12 years.
            </p>
            <a className="homeClickText" href="#/historical">CLICK TO VIEW GRAPH</a>
          </div>
        </div>
      </button>
    </div>
  }

  // Wrapper for agency funding info div
  agencyWrapper() {
    return <div className="agencyWrap col-lg-3">
      <button type="button" onClick={(e) => {
          e.preventDefault();
          window.location.href='#/breakdown';
          }}>
        <div className="homeDiv">
          <div className="homeTitle">
            <a className="homeTitleText" href="#/states">Agency Breakdown</a>
          </div>
          <div className="homeImg">
            <img className="agencyImg" src={agencyImg} alt="Agency Graph Icon"></img>
          </div>
          <div className="homeText">
            <p>This page displays the current agency funding based on the searched agency.
              Data is presented in a circle graph and each dollar is represented as millions.
            </p>
            <a className="homeClickText" href="#/breakdown">CLICK TO VIEW GRAPH</a>
          </div>
        </div>
      </button>
    </div>
  }

  // Wrapper for debt info div
  debtWrapper() {
    return <div className="debtWrap col-lg-3">
      <button type="button" onClick={(e) => {
          e.preventDefault();
          window.location.href='#/debt';
          }}>
        <div className="homeDiv">
          <div className="homeTitle">
            <a className="homeTitleText" href="#/states">Overall Debt</a>
          </div>
          <div className="homeImg">
            <img className="debtImg" src={debtImg} alt="Debt Graph Icon"></img>
          </div>
          <div className="homeText">
            <p>The overall debt of the United States can be seen in a bar graph. 
              A date can be selected and the overall debt, intragovernmental holdings, and public holdings
              amount will be displayed.
            </p>
            <a className="homeClickText" href="#/debt">CLICK TO VIEW GRAPH</a>
          </div>
        </div>
      </button>
    </div>
  }

  // Wrapper for home all home divs so bootstrap grids can be implemented
  divWrapper() {
    return (
      <div className="row"> 
        {this.stateWrapper()}
        {this.historicalWrapper()}
        {this.agencyWrapper()}
        {this.debtWrapper()}
      </div>)
  }

  render() {
    return (
      <div className="home">
        {this.aboutWrapper()}
        {this.divWrapper()}
      </div>
    )
  }
}

export default HomeView;
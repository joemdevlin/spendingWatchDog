import React, { Component } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import APIRequester from '../apiRequester';

let randomColor =  function(){
  return '#' + Math.floor(Math.random()*16777215).toString(16)
};

class AgencyBreakdownView extends Component {
  constructor(props){
    super(props);

    this.state = {
      agencyName: '', 
      year: '', 
      agencyNames : [],
      dataToGraph: null
    };

    // Have to register these functions for callbacks
    this.onAgencySearch = this.onAgencySearch.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.graph = this.graph.bind(this);
    this.getForm = this.getForm.bind(this);
    this.moneyFormatter = this.moneyFormatter.bind(this);

    // Updates the text for H2 tag
    this.name = "Agency Budgets"
    this.height = 500;
    this.width = '100%';
  
  }

  getForm(){
    return  <Form>
              <Form.Group as={Row}>
                <Form.Label column sm="4">
                  Agency Name
                </Form.Label>
                <Col sm="8">
                  <ReactSearchAutocomplete
                    items={this.state.agencyNames}
                    onSearch={this.onAgencySearch}
                    onSelect={this.handleOnSelect}
                    onFocus={this.handleOnFocus}
                    autoFocus 
                  />
                </Col>
              </Form.Group>
            </Form>
  }

  moneyFormatter(num){
    return '$' + num.toLocaleString('us-EN', {maximumFractionDigits: 2});
  }

  // Graphs the data the user searched for
  graph(){
    return  <PieChart>
                <Pie data={this.state.dataToGraph} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                {
                  this.state.dataToGraph.map((entry, index) => <Cell fill={randomColor()}/>)
                 }
                </Pie>
                <Tooltip formatter={this.moneyFormatter}/>
                <Legend />
              </PieChart>
  }

  onAgencySearch(string, cached){
    console.log(string, cached);
  }

  // When page loads, get the possible agencies
  componentDidMount () {
    var _this = this;
    this.serverRequest  = APIRequester.getAgencyNamesList()
      .then(function(result) {    
        _this.setState({
            agencyNames: result
        });
      })
    ;
  }

  // This function is called if the did mount call back
  // does not have a chance to finish.  For now, there
  // is nothing to clean up
  componentWillUnmount () {
  }

  // When the user picks an agency from the list, a
  // query needs to be ran to get the specific agencies
  // funding break down.
  handleOnSelect(item){
    var _this = this;
    this.setState({agencyName: item.name});
    console.log("Searching for data on " + item.name);
    this.state.agencyNames.forEach(ele =>{
      if(ele.name === item.name){
        this.serverRequest  = APIRequester.getAgencyBudgets(ele.tierCode)
        .then(function(result) { 
          console.log(result);
          const agency = result.filter(a => a.name === item.name);

          // No data forund for this agency.  Consider an error alert
          // in the future
          if(result.length != 1){
            _this.setState({
              dataToGraph: []
            });
            console.log(`Found this many entries: {result.length}, but expected 1`);
            console.log(agency);
            return
          }

          // Data is returned at a top agency level, so for now just show the user
          // the agency they requested.
          const formatted = result[0].subFunding.map(ele => {
            return {name : ele.name, amount : ele.amount}
          });
          console.log(formatted);
          _this.setState({
            dataToGraph: formatted
          });
        })
      ;
      }
    })
  }
 
  handleOnFocus(){
    console.log("Focused");
  }

  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
          <h2>{this.name}</h2>
        </Row>
        {this.getForm()}
        {this.state.dataToGraph &&
          <div>
            <Row className="justify-content-md-center">
              <h3>{this.state.agencyName} Funding in Million(s)</h3>
            </Row>
            <Row className="justify-content-md-center">
              <Col sm="10">
              <ResponsiveContainer width = {this.width} height = {this.height} >
                {this.graph()}
              </ResponsiveContainer>
              </Col>
            </Row>
          </div>
       }
      </div>
    )
  }
}

export default AgencyBreakdownView;
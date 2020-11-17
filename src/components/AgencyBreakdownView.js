import React, { Component } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import APIRequester from '../apiRequester';

class AgencyBreakdownView extends Component {
  constructor(props){
    super(props);

    this.state = {
      agencyName: '', 
      year: '', 
      agencyNames : [],
      dataToGraph: null
    };
    this.onAgencySearch = this.onAgencySearch.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.graph = this.graph.bind(this);
    this.name = "Agency Budgets"
  }

  graph(){
    return  <PieChart width={730} height={300}>
              <Pie data={this.state.dataToGraph} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
  }

  onAgencySearch(string, cached){
    console.log(string, cached);
  }

  componentDidMount () {
    this.mounted = true;
    var _this = this;
    this.serverRequest  = APIRequester.getAgencyNamesList()
      .then(function(result) {    
        _this.setState({
            agencyNames: result
        });
      })
    ;
  }

  componentWillUnmount () {
  }

  handleOnSelect(item){
    var _this = this;
    this.setState({agencyName: item.name});
    console.log("Searching for data on " + item.name);
    this.state.agencyNames.forEach(ele =>{
      if(ele.name === item.name){
        this.serverRequest  = APIRequester.getAgencyBudgets(ele.tierCode)
        .then(function(result) { 
          console.log(result);
          const formatted = result[0].subFunding.map(ele => {return {name : ele.year, amount : ele.amount}});
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
        <h2>{this.name}</h2>
        <Form>
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
        {this.graph()}
      </div>
    )
  }
}

export default AgencyBreakdownView;
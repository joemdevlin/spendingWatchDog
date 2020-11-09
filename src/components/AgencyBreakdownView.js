import React, { Component } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";

class AgencyBreakdownView extends Component {
  constructor(props){
    super(props);
    const startNames = [
      {
        id: 0,
        name: "VA",
      },
      {
        id: 1,
        name: "Army"
      }
    ];

    const startYears = [
      {
        id: 0,
        name: "2001",
      },
      {
        id: 1,
        name: "2011"
      },
    ];

    this.state = {
      agencyName: '', 
      year: '', 
      agencyNames : startNames,
      years: startYears
    };

    this.onAgencySearch = this.onAgencySearch.bind(this);
    this.onYearSearch = this.onYearSearch.bind(this);
  }

  onAgencySearch(string, cached){
    this.setState({agencyName: string});
    console.log(string, cached);
  }

  onYearSearch(string, cached){
    this.setState({agencyName: string});
    console.log(string, cached);
  }

  handleOnSelect(item){
    // the item selected
    console.log(item);
  }
 
  handleOnFocus(){
    console.log("Focused");
  }

  render() {
    return (
      <div>
        <h2>Agency Breakdown?</h2>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Agency Name
            </Form.Label>
            <Col sm="4">
              <ReactSearchAutocomplete
                 items={this.state.agencyNames}
                onSearch={this.onAgencySearch}
                onSelect={this.handleOnSelect}
                onFocus={this.handleOnFocus}
                autoFocus 
              />
            </Col>
            <Form.Label column sm="2">
              Year
            </Form.Label>
            <Col sm="4">
              <ReactSearchAutocomplete
                items={this.state.years}
                onSearch={this.onYearSearch}
                onSelect={this.handleOnSelect}
                onFocus={this.handleOnFocus}
                autoFocus 
              />
            </Col>
          </Form.Group>
        </Form>
      </div>

    )
  }
}

export default AgencyBreakdownView;
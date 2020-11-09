import React, { Component } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";
import APIRequester from '../apiRequester';

// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
const startYears = [...Array(13).keys()].map((i) => {return {id: i, name: (i + 2008).toString()}});

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
import React, { Component } from 'react';
import AgencyBreakdownView from './AgencyBreakdownView';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";

class HistoricalFundingView extends AgencyBreakdownView {
  render() {
    return (
      <div>
        <h2>Historical?</h2>
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
      </div>
    )
  }
}

export default HistoricalFundingView;
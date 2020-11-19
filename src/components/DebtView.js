import React, { Component } from 'react';
import APIRequester from '../debtApiRequester';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";
import { BarChart, Bar, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';

// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
const startYears = [...Array(13).keys()].map((i) => {return {id: i, name: (i + 2008).toString()}});

//temp graph input
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

class DebtView extends Component {
  render() {
    return (
      <div>
        <h2>Debt page... in progress</h2>
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </div>
      
    )
  }
}

export default DebtView;
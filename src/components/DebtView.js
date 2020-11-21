import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BarChart, Bar, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';

//temp graph input
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

class DebtView extends Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date()
        };
    }

    searchFromDate() {
      return (
      <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})} />
      );
    } 

    handleChange = date => {
      date.format();
    };

    render() {
        let date= parseInt(this.state.startDate.getMonth()+1) + "/" + this.state.startDate.getDate() + "/" +this.state.startDate.getFullYear();
        return (
        <div>
            <h4 id={date} class="datePicker">Select a date:</h4>
            {this.searchFromDate()}
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
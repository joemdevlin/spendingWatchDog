import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import APIRequester from '../debtApiRequester';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {Form, Row, Col} from "react-bootstrap";
import { BarChart, Bar, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';
import { render } from '@testing-library/react';

// https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
const startYears = [...Array(13).keys()].map((i) => {return {id: i, name: (i + 1997).toString()}});

const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    );
};

//temp graph input
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

class DebtView extends Component {
    constructor(props){
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };
        /*this.onMonthSearch = this.onMonthSearch.bind(this);
        this.onYearSearch = this.onYearSearch.bind(this);*/
    }
    
      /*
    this.state = {
        month: '',
        months: 'January',
        year: '',
        years: startYears
    };

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
    
      handleOnSelect(item){
        // the item selected
        console.log(item);
      }
     
      handleOnFocus(){
        console.log("Focused");
      }*/

    searchFromDate() {
        return (
        <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})} />
        );
    } 

    searchToDate() {
        return (
        <DatePicker selected={this.state.endDate} onChange={date => this.setState({endDate: date})} />
        );
    } 
    

    render() {
        //alert(String(this.searchToDate()));
        return (
        <div>
            <h4>min. date:</h4>
            {this.searchFromDate()}
            <h4>max date:</h4>
            {this.searchToDate()}
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
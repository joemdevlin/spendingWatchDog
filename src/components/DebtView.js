import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import APIRequester from '../debtApiRequester';
import {Row, Col} from "react-bootstrap";
import { BarChart, Bar, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';

const date = null;

class DebtView extends Component {
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            dataToGraph: null
        };

        this.graphTitle = "Debt to the Penny"
    }

    graphWrapper(){
        return <div>
                <Row className="justify-content-md-center">
                  <Col sm="12">
                      {this.graphTitle}
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col sm="12">
                      {this.barGraph()}
                  </Col>
                </Row>
              </div>
      }

    // Updates the data to be graphed
    updateData(newData){
        console.log(newData);
        this.setState({
            dataToGraph: newData
        })
    }

    /*componentDidMount(date){
        APIRequester.getDebt(date).then(newData =>{
          this.updateData(newData);
        });
    }*/

    // Graphs the data the user searched for
    barGraph(){
        return <BarChart width={1000}
                        height={300}
                        data={this.state.dataToGraph}
                        >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Total Outstanding Debt Amount" dataKey="tot_pub_debt_out_amt" fill="#8884d8" />
                    <Bar name="Intragovernmental Holdings" dataKey="intragov_hold_amt" fill="#82ca9d" />
                    <Bar name="Total Public Debt Outstanding" dataKey="debt_held_public_amt" fill="#ffc658" />
                </BarChart> 
    }

    // Add React date picker functionality that updates onChange
    searchFromDate() {
        return (
        <DatePicker selected={this.state.startDate} onChange={this.onSelect(date)} />//date => this.setState({startDate: date})} />
        );
    } 

    // When the user picks a date, a query needs to be ran to get the specific data
    onSelect(date){
        var _this = this; // Create closure for use in call back
    
        if(this.state.startDate === date.startDate){
            this.serverRequest  = APIRequester.getDebt(date)
            .then(function(result) { 
            // No data found for this date.  Consider an error alert in the future
            if(result == null){
                _this.updateData(null);
                console.log(`No data found on this date.`);
                return
            }

            // Data is returned at a top agency level, so for now just show the user
            // the agency they requested.
            const formatted = result[0].subFunding.map(ele => {
                return {name : ele.name, amount : ele.amount}
            });
            _this.updateData(formatted)
            })
        ;
        }
        return (
            <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})} />
        );
    }

    // Changes date to selected
    handleChange = date => {
      date.format();
    };

    render() {
        //date = this.state.startDate.getFullYear() + "-" + parseInt(this.state.startDate.getMonth()+1) + "-" + this.state.startDate.getDate();
        
        let displayDate = parseInt( this.state.startDate.getMonth()+1) + "/" + this.state.startDate.getDate() + "/" + this.state.startDate.getFullYear();
        //const data = [{yaxis: 'Amount in Dollars', xaxis: 'Record date: ' + displayDate, totalAmt: 2400, govAmt: 623, publicAmt: 2132}];

        return (
        <div className="debtGraph">
            <h4 id={date} class="datePicker">Select a date:</h4>
            {this.searchFromDate()}
            {/*this.componentDidMount(date)*/}
            <h2>U.S. Public Debt</h2>
            {this.graphWrapper()}
        </div>
        
        )
    }
}

export default DebtView;
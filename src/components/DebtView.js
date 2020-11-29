import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getDebt} from '../debtApiRequester';
import {Row, Col} from "react-bootstrap";
import { ResponsiveContainer, BarChart, Bar, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'; 

var selectedDate;

class DebtView extends Component {

    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            dataToGraph: []

        };

        this.graphTitle = "Debt to the Penny"
    }

    // Wrapper for calling Recharts bar graph
    graphWrapper(){
        return <div className="debtGraph">
                <Row className="justify-content-md-center">
                  <Col sm="12">
                      <h3 className="pageHeader">U.S. Public Debt</h3>
                      {this.graphTitle}
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

    // Graphs the data the user searched for
    barGraph(){
        return <ResponsiveContainer aspect={6.0/3.0} width='90%'>
                 <BarChart data={this.state.dataToGraph}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Total Outstanding Debt Amount" dataKey="tot_pub_debt_out_amt" fill="#8884d8" />
                    <Bar name="Intragovernmental Holdings" dataKey="intragov_hold_amt" fill="#82ca9d" />
                    <Bar name="Total Public Debt Outstanding" dataKey="debt_held_public_amt" fill="#ffc658" />
                </BarChart> 
        </ResponsiveContainer> 
    }

    // Add React date picker functionality that updates onChange
    searchFromDate() {
        return <div  className="datePicker">
            <h4 className="pageHeader">Select a date:</h4>
            <DatePicker selected={this.state.startDate} onChange={date => this.setState({startDate: date})} />
        </div>
    } 

    // When the user picks a date, the date value will be added to get the correct API data
    onSelect(date){
        var _this = this; // Create closure for use in call back
    
        this.serverRequest = getDebt(date)
        .then(function(result) { 
            // No data found for this date.  Consider an error alert in the future
            if(result == null){
                _this.updateData(null);
                console.log(`No data found on this date.`);
                return
            }
            // Update 
            const formatted = result.data.map(ele => {
                return {name : ele.name, amount : ele.amount}
            });
            _this.updateData(formatted)
        })
        ;
    }

    render() {
        return (
            <div className="debtPage">
                {this.searchFromDate()}
                {this.onSelect(this.state.startDate.getFullYear() + "-" + parseInt(this.state.startDate.getMonth()+1) 
                    + "-" + this.state.startDate.getDate())}
                {this.graphWrapper()}
            </div>
        )
    }
}

export default DebtView;
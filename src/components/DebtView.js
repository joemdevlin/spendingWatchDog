import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getDebt} from '../debtApiRequester';
import {Row, Col} from "react-bootstrap";
import { ResponsiveContainer, BarChart, Bar, Tooltip, Legend, CartesianGrid, XAxis, YAxis } from 'recharts'; 

// Temporary data array used for class demo
const demoData = [{outstanding: 27.26, publicAmt: 21.21, govHolds: 6.05}];

class DebtView extends Component {

    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            dataToGraph: []

        };

        this.graphTitle = "Debt represented in trillions"
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

    // Graphs the data the user inputed
    // *NOTE: only temp data is being used since API data couldn't be fetched. Otherwise, dataToGraph will be used
    barGraph(){
        return <ResponsiveContainer aspect={6.0/3.0} width='90%'>
                 <BarChart data={demoData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='Government' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Total Outstanding Debt Amount" dataKey="outstanding" fill="#8884d8" />
                    <Bar name="Intragovernmental Holdings" dataKey="govHolds" fill="#82ca9d" />
                    <Bar name="Total Public Debt Outstanding" dataKey="publicAmt" fill="#ffc658" />
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
            const formatted = result.map(ele => {
                return {govHolds : ele.govHolds, publicAmt: ele.publicAmt, outstanding: ele.outstanding, }
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
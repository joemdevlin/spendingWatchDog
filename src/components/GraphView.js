import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import {ResponsiveContainer } from 'recharts';

class GraphView extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataToGraph: null
    };

    this.header = "Temp";
    this.height = 500;
    this.width = '100%';

  }

  // Graphs the data the user searched for. Needs to be implemented by child class
  graph(){
    return  null
  }
  
  // Bootstrap-ifies the graph
  graphWrapper(){
    return <Row className="justify-content-md-center">
            <Col sm="12">
              <ResponsiveContainer width = {this.width} height = {this.height} >
                {this.graph()}
              </ResponsiveContainer>
            </Col>
          </Row>
  }

  // Bootrap-ifies the header
  headerWrapper(){
    return  <Row className="justify-content-md-center">
              <Col sm='12'>
                <h1>{this.header}</h1>
              </Col>
            </Row>
  }

  // Updates the data to be graphed
  updateData(newData){
    console.log(newData);
    this.setState({
      dataToGraph : newData
    })
  }


  render() {
    return (
      <div className="graph">
        {this.headerWrapper()}
        {this.state.dataToGraph && this.graphWrapper()}
      </div>
    )
  }
}

export default GraphView;
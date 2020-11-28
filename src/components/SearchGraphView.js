import GraphView from './GraphView';
import {Row, Col, Form} from "react-bootstrap";
import {ResponsiveContainer } from 'recharts';
import Select from 'react-select';

class SearchGraphView extends GraphView {
  constructor(props){
    super(props);

    this.state = {
      dataToGraph: null,
      searchOptions: null,
      searchChoice: null
    };

    this.searchLabel = "Agency name"
    this.graphTitle = "Placeholder"
  }

  graphWrapper(){
    return <div>
            <Row className="justify-content-md-center">
              <Col sm="8">
                  {this.graphTitle}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col sm="12">
                <ResponsiveContainer width = {this.width} height = {this.height} >
                  {this.graph()}
                </ResponsiveContainer>
              </Col>
            </Row>
          </div>
  }
  // Form where the user will be searching for specific agencies
  getForm(){
    return  <Form>
              <Form.Group as={Row} className="justify-content-md-center">
                <Form.Label column sm="2">
                  {this.searchLabel}
                </Form.Label>
                <Col sm="6">
                  <Select options={this.state.searchOptions} onChange={this.onChange.bind(this)}/>
                </Col>
              </Form.Group>
            </Form>
  }

  // Placeholder functions for the user interacting with the form.
  onChange(string){
    console.log(string);
  }

  // Populates the search options
  updateSearchOptions(newData){
    console.log(newData);
    this.setState({searchOptions : newData});
  }

  // Indicates the choice the user has made
  updateSearchChoice(newValue){
    console.log(newValue);
    this.setState({searchChoice: newValue});
  }

  render() {
    return (
      <div className="graph">
        {this.headerWrapper()}
        {this.getForm()}
        {this.state.dataToGraph && this.graphWrapper()}
      </div>
      
    )
  }
}

export default SearchGraphView;
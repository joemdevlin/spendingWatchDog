import AgencyBreakdownView from './AgencyBreakdownView';
import {LineChart, XAxis, YAxis, Line} from "recharts";
import APIRequester from '../apiRequester';

class HistoricalFundingView extends AgencyBreakdownView {
  constructor(props){
    super(props);
    this.name = "Historical Agency Funding"
  }

  graph(){
    return  <LineChart width={500} height={300} data={this.state.dataToGraph}>
              <XAxis dataKey="year"/>
              <YAxis/>
              <Line dataKey= "amount"/>
            </LineChart>
  }
  handleOnSelect(item){
    var _this = this;
    this.setState({agencyName: item.name});
    console.log("Searching for data on " + item.name);
    this.serverRequest  = APIRequester.getAgencyHistorical(item.name)
      .then(function(result) { 
        console.log(result);
        _this.setState({
          dataToGraph: result
        });
      })
    ;
  }
}

export default HistoricalFundingView;
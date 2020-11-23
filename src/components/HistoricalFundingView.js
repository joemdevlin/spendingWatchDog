import AgencyBreakdownView from './AgencyBreakdownView';
import {LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid} from "recharts";
import APIRequester from '../apiRequester';

class HistoricalFundingView extends AgencyBreakdownView {
  constructor(props){
    super(props);
    this.name = "Historical Agency Funding"
  }

  graph(){
    return <LineChart data={this.state.dataToGraph} label="Funding in $100 Millions">
              <XAxis dataKey="year"/>
              <YAxis></YAxis>
              <Line dataKey= "amount"/>
              <Tooltip formatter={this.moneyFormatter}/>
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
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
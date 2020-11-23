import SearchGraphView from './SearchGraphView';
import {LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid} from "recharts";
import APIRequester from '../apiRequester';
import {moneyFormatter} from '../utils';

class HistoricalFundingView extends SearchGraphView {
  constructor(props){
    super(props);
    this.header = "Historical Agency Funding"
    this.graphTitle = "Funding in Millions of dollars"
  }

  componentDidMount(){
    APIRequester.getAgencyNamesList().then(newData =>{
      this.updateSearchOptions(newData);
    });
  }

  graph(){
    return <LineChart data={this.state.dataToGraph} label="Funding in $100 Millions">
              <XAxis dataKey="year"/>
              <YAxis></YAxis>
              <Line dataKey= "amount"/>
              <Tooltip formatter={moneyFormatter}/>
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
  }

  onSelect(item){
    var _this = this;
    this.updateSearchChoice(item.name)

    APIRequester.getAgencyHistorical(item.name)
      .then(function(result) { 
        _this.updateData(result)
      })
    ;
  }
}

export default HistoricalFundingView;
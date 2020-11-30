import SearchGraphView from './SearchGraphView';
import {LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid} from "recharts";
import {getAgencyNamesList, getAgencyHistorical} from '../apiRequester';
import {moneyFormatter} from '../utils';

/*
  Shows how an agency has been funded over the years.  The API supports back to 2008.
*/
class HistoricalFundingView extends SearchGraphView {
  constructor(props){
    super(props);
    this.header = "Historical Agency Funding"
    this.graphTitle = "Total Fenderal funding in US Dollars"
  }

  componentDidMount(){
    getAgencyNamesList().then(newData =>{
      const formatted = newData.map(ele => {return {name: ele.name, label: ele.name, value: ele.name, tierCode : ele.tierCode}})
      this.updateSearchOptions(formatted);
    });
  }

  graph(){
    const paddingSize = this.graphPadding(this.state.dataToGraph);
    return <LineChart data={this.state.dataToGraph} label="US Federal Funding" margin={{left:paddingSize, top: 10, right: paddingSize, bottom: 10}}>
              <XAxis dataKey="year"/>
              <YAxis formatter={moneyFormatter}></YAxis>
              <Line dataKey= "amount"/>
              <Tooltip formatter={moneyFormatter}/>
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
  }

  onChange(item){
    var _this = this;
    this.updateSearchChoice(item.name)

    getAgencyHistorical(item.name)
      .then(function(result) { 
        _this.updateData(result)
      })
    ;
  }
}

export default HistoricalFundingView;
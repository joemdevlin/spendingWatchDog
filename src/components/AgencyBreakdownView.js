import SearchGraphView from './SearchGraphView';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import {randomColor, moneyFormatter} from '../utils';
import {foo, getAgencyNamesList} from '../apiRequester';

/*
  This view is used to show how the funding for each agency is broken down internally.
*/
class AgencyBreakdownView extends SearchGraphView {
  constructor(props){
    super(props);
    this.header ="Agency Funding"
    this.graphTitle = "Funding in Millions of dollars"
  }

  componentDidMount(){
    getAgencyNamesList().then(newData =>{
      const formatted = newData.map(ele => {return {name: ele.name, label: ele.name, value: ele.name, tierCode : ele.tierCode}})
      this.updateSearchOptions(formatted);
    });
  }

  // Graphs the data for the agency the user picked
  graph(){
    return  <PieChart>
                <Pie data={this.state.dataToGraph} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                {
                  this.state.dataToGraph.map((entry, index) => <Cell fill={randomColor()}/>)
                 }
                </Pie>
                <Tooltip formatter={moneyFormatter}/>
                <Legend />
              </PieChart>
  }

  // When the user picks an agency from the list, a
  // query needs to be ran to get the specific agencies
  // funding break down.
  onChange(item){
    var _this = this; // Create closure for use in call back
    this.updateSearchChoice(item.value)

    this.state.searchOptions.forEach(ele =>{
      if(ele.name === item.value){
        this.serverRequest  = foo(ele.tierCode)
        .then(function(result) { 
          // No data forund for this agency.  Consider an error alert in the future
          if(result.length < 1){
            _this.updateData(null);
            console.log(`Found this many entries: ${result.length}, but expected 1`);
            console.log(result);
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
    })
  }
}

export default AgencyBreakdownView;
import GraphView from './GraphView';
import {moneyFormatter} from '../utils';
import {RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, Tooltip, Legend, Radar} from "recharts";
import APIRequester from '../apiRequester';
class StateView extends GraphView {
  constructor(props){
    super(props);
    this.header = "State Funding in Millions"
    this.height = 1000;
  }
  
  graph(){
    return <RadarChart data={this.state.dataToGraph}>
              <PolarGrid />
              <PolarAngleAxis cx='10%' dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="Funding" dataKey="amount" />
              <Tooltip formatter={moneyFormatter}/>
              <Legend />
          </RadarChart>
  }

  componentDidMount(){
    APIRequester.getStateFunding().then(newData =>{
      this.updateData(newData);
    });
  }
}

export default StateView;
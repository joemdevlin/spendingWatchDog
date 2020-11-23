import AgencyBreakdownView from './AgencyBreakdownView';
import {RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, Tooltip, Legend, Radar} from "recharts";
import APIRequester from '../apiRequester';
class StatesView extends AgencyBreakdownView {
  constructor(props){
    super(props);
    this.name = "State Funding"
    this.height = 1000;
  }

  getForm(){
    return <div></div>
  }
  graph(){
    return <RadarChart data={this.state.dataToGraph}>
              <PolarGrid />
              <PolarAngleAxis cx='10%' dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="Funding" dataKey="amount" />
              <Tooltip formatter={this.moneyFormatter}/>
              <Legend />
          </RadarChart>
  }
  componentDidMount () {
    var _this = this;
    this.serverRequest  = APIRequester.getStateFunding()
      .then(function(result) { 
        console.log(result);
        _this.setState({
          dataToGraph: result
        });
      })
    ;
  }
}

export default StatesView;
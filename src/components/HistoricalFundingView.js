import AgencyBreakdownView from './AgencyBreakdownView';
import APIRequester from '../apiRequester';

class HistoricalFundingView extends AgencyBreakdownView {
  constructor(props){
    super(props);
    this.name = "Historical Agency Funding"
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
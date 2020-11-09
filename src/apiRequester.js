const fetch = require('node-fetch');
const baseURL = 'https://api.usaspending.gov';
const agenciesURL = baseURL + '/api/v2/references/toptier_agencies';
const historicalFunding = baseURL + '/api/v2/search/spending_over_time';
const stateFunding = baseURL + '/api/v2/search/spending_by_category';


// Holds Top Levle Agency info
class Agency {
    constructor(name, id, tierCode) {
      this.name = name;
      this.id = id;
      this.tierCode = tierCode;
    }
}

// Holds funding breakdown for a specific Agency
// Note: subfinding is a list of Funding.
class Funding {
    constructor(name, amount, subFunding) {
      this.name = name;
      this.amount = amount;
      this.subFunding = subFunding;
    }
}

// Helper function to run a get http request with
// no explicit parameters.
async function fetchPage(url, options={}){
    if(url  === null){
        return null;
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

// Returns a list of Agency.  Preforms API request
// to get a list of all possible agencies to pick from.
async function getAgencyNames(){
    const response = await fetchPage(agenciesURL);
    const result = response.results.map(ele => {
        return new Agency(ele["agency_name"], ele["agency_id"], ele["toptier_code"])
    });
    return result;
}

async function getAgencyNamesList(){
    const response = await getAgencyNames();
    const result = response.map((agency, index) => {
        return {id: index, name: agency.name}
    });
    return result;
}

// Returns a list of Funding.  Used to encapsualte each agencies spending breakdown.
async function getAgencyBudgets(toptierCode){
    const response = await fetchPage(`${baseURL}/api/v2/agency/${toptierCode}/budget_function`);
    const result = response.results.map(ele => {
        return new Funding(ele["name"], ele["obligated_amount"], ele.children.map(child =>{
            return new Funding(child["name"], child["obligated_amount"], []);
        }));
    });
    return result;
}

// Returns a list of amount and year pairs
async function getAgencyHistorical(name){
    const apiOptions = {
  	    group : "fiscal_year",
  	     filters : {
  	  	    agencies : [
                {
                    type: "awarding",
                    tier: "toptier",
                    name: name
                }
  	  	    ]
        }
    };
    const httpOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiOptions)
    };

    const response = await fetchPage(historicalFunding, httpOptions);
    const result = response.results.map(year =>
        ({amount : Number(year.aggregated_amount), year : Number(year.time_period.fiscal_year)})
    );

    return result;
}

// Returns a list of states and funding pairs
async function getStateFunding(){
    const apiOptions = {
        category : "state_territory",
        limit: "50"
    };
    const httpOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiOptions)
    };

    const response = await fetchPage(stateFunding, httpOptions);
    const result = response.results.map(state =>
        ({name : state.name, amount : Number(state.amount)})
    );

    return result;
}

module.exports = {getAgencyNames, getPage: fetchPage, Agency, Funding, getAgencyBudgets, getAgencyHistorical, getStateFunding, getAgencyNamesList};
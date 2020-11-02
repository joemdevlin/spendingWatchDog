const fetch = require('node-fetch');
const baseURL = 'https://api.usaspending.gov';
const agenciesURL = baseURL + '/api/v2/references/toptier_agencies';

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
async function getPage(url){
    if(url  === null){
        return null;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Returns a list of Agency.  Preforms API request
// to get a list of all possible agencies to pick from.
async function getAgencyNames(){
    const response = await getPage(agenciesURL);
    const result = response.results.map(ele => {
        return new Agency(ele["agency_name"], ele["agency_id"], ele["toptier_code"])
    });
    return result;
}

// Returns a list of Funding.  Used to encapsualte each agencies spending breakdown.
async function getAgencyBudgets(toptierCode){
    const response = await getPage(`${baseURL}/api/v2/agency/${toptierCode}/budget_function`);
    const result = response.results.map(ele => {
        return new Funding(ele["name"], ele["obligated_amount"], ele.children.map(child =>{
            return new Funding(child["name"], child["obligated_amount"], [])
        }))
    });
    return result;
}

module.exports = {getAgencyNames, getPage, Agency, Funding, getAgencyBudgets};
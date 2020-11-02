const fetch = require('node-fetch');
const baseURL = 'https://api.usaspending.gov';
const agenciesURL = baseURL + '/api/v2/references/toptier_agencies';

class Agency {
    constructor(name, id, tierCode) {
      this.name = name;
      this.id = id;
      this.tierCode = tierCode;
    }
}

class Funding {
    constructor(name, amount, subFunding) {
      this.name = name;
      this.amount = amount;
      this.subFunding = subFunding;
    }
}

async function getPage(url){
    if(url  === null){
        return null;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getAgencyNames(){
    const response = await getPage(agenciesURL);
    const result = response.results.map(ele => {
        return new Agency(ele["agency_name"], ele["agency_id"], ele["toptier_code"])
    });
    return result;
}

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
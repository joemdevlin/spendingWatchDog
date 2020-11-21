const fetch = require('node-fetch');
const baseURL = 'https://transparency.treasury.gov/services/api/fiscal_service/';
const debtToPenny = baseURL + 'v2/accounting/od/debt_to_penny';

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

// Returns a list of date, intragovernmental holdings, public debt outstanding,
// and outstanding public debt. 
class Debt {
    constructor(date, govHolds, public, outstanding) {
      this.date = date;
      this.govHolds = govHolds;
      this.public = public;
      this.outstanding = outstanding;
    }
}

async function getDebt(){
    const response = await fetchPage(debtToPenny);
    const result = response.results.map(ele => {
        return new Debt(ele["record_date"], ele["intragov_hold_amt"], ele["debt_held_public_amt"], 
        ele["tot_pub_debt_out_amt"])
    });
    return result;
}

module.exports = {getDebt, Debt};
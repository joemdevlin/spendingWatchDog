const fetch = require('node-fetch');
const proxyURL = 'https://cors-anywhere.herokuapp.com/';
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
    constructor(govHolds, publicAmt, outstanding) {
      this.govHolds = govHolds;
      this.publicAmt = publicAmt;
      this.outstanding = outstanding;
    }
}

async function getDebt(date){
    const response = await fetchPage(proxyURL + debtToPenny + '?filter=record_date:eq:' + date);
    const result = response.data.map(ele => {
        return new Debt(ele["intragov_hold_amt"], ele["debt_held_public_amt"], 
        ele["tot_pub_debt_out_amt"])
    });
    return result;
}

module.exports = {getDebt, Debt};
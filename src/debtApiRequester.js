const fetch = require('node-fetch');
const baseURL = 'http://transparency.treasury.gov/services/api/fiscal_service/';
const debtToPenny = baseURL + 'v2/accounting/od/debt_to_penny';

// Helper function to run a get http request with
// no explicit parameters.
export async function fetchPage(url){
    if(url  === null){
        return null;
    }
    
    // Add headers for fetch
    let headers = new Headers();

    headers.append('Access-Control-Allow-Headers', 'Content-Type,Authorization,Origin,X-Auth-Token');
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Origin','*');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const response = await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: headers
    });

    const data = await response.json();
    return data;
}

// Returns a list of date, intragovernmental holdings, public debt outstanding,
// and outstanding public debt. 
export class Debt {
    constructor(govHolds, publicAmt, outstanding) {
      this.govHolds = govHolds;
      this.publicAmt = publicAmt;
      this.outstanding = outstanding;
    }
}

// Return an array of data from API based on date argument
export const getDebt = async function(date){

    const response = await fetchPage(debtToPenny + '?filter=record_date:eq:' + date);

    const result = response.data.map(ele => { 
        alert(ele); // alert to check whether there are any data, but comes out as "undefined"
        return new Debt(ele["intragov_hold_amt"], ele["debt_held_public_amt"], 
        ele["tot_pub_debt_out_amt"])
    });
    return result;
}

//module.exports = {getDebt, Debt};
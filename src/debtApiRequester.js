const fetch = require('node-fetch');
const baseURL = 'https://transparency.treasury.gov/services/api/fiscal_service/';
const debtToPenny = baseURL + 'v1/accounting/od/debt_to_penny';

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

// Returns a list of dates by month and year.  Preforms API request
// to get a list of all possible agencies to pick from.
class Debt {
    constructor(month, year) {
      this.month = month;
      this.year = year;
    }
}

async function getDebt(){
    const response = await fetchPage(debtToPenny);
    const result = response.results.map(ele => {
        return new Debt(ele["reporting_calendar_month"], ele["reporting_calendar_year"])
    });
    return result;
}

module.exports = {getDebt, Debt};
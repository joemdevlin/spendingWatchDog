const apiRequestor = require('./apiRequester');
const agenciesURL = 'https://api.usaspending.gov/api/v2/references/toptier_agencies'

// Helper function that handles the fetch requests
test('Get requests base', () => {
    return apiRequestor.getPage(agenciesURL).then(d => {
        expect(d.results).toHaveLength(106);
        expect(d.results[0]["agency_name"]).toEqual("Access Board");
    });
});

// Grabs all of the Agencies.  Returns a list of Agency Objects.
test('Get Agency Names', () => {
    return apiRequestor.getAgencyNames(agenciesURL).then(d => {
        expect(d).toHaveLength(106);
        expect(d[0].name).toEqual("Access Board");
    });
});

// Grabs all of the Agencies.  Returns a list of Agency Objects.
test('Get Agency Names in search format', () => {
    return apiRequestor.getAgencyNamesList().then(d => {
        expect(d).toHaveLength(106);
        expect(d[0].name).toEqual("Access Board");
        expect(d[0].id).toEqual(0);
    });
});

// Full agency funding break down.  Returns a list of Funding: top level
// agencies and their sub divisions.  This example has only one top level
// agency name.
test('Get Agency Funding Single', () => {
    return apiRequestor.getAgencyBudgets("036").then(d => {
        expect(d).toHaveLength(1);
        expect(d[0].name).toEqual("Veterans Benefits and Services");
        expect(d[0].subFunding[0].name).toEqual("Income security for veterans");
    });
});

// List of years funded
test('Get Agency funding over time', () => {
    return apiRequestor.getAgencyHistorical("Department of the Treasury").then(d => {
        expect(d).toHaveLength(14);
        expect(d[3].year).toEqual(2011);
    });
});

// List of state/funding pairing
test('Get State funding', () => {
    return apiRequestor.getStateFunding().then(d => {
        expect(d).toHaveLength(50);
        expect(d[3].name).toEqual("New York");
    });
});
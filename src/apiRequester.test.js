const apiRequestor = require('./apiRequester');
const agenciesURL = 'https://api.usaspending.gov/api/v2/references/toptier_agencies'

test('Get requests base', () => {
    return apiRequestor.getPage(agenciesURL).then(d => {
        expect(d.results).toHaveLength(106);
        expect(d.results[0]["agency_name"]).toEqual("Access Board");
    });
});

test('Get Agency Names', () => {
    return apiRequestor.getAgencyNames(agenciesURL).then(d => {
        expect(d).toHaveLength(106);
        expect(d[0].name).toEqual("Access Board");
    });
});
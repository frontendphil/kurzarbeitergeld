const { join } = require('path')
const csv=require('csvtojson')

module.exports = async (req, res) => {

    const agencies = await csv().fromFile(join(__dirname, 'agencies-data.csv'));
    
    const filterString = req.query.filter
    const zipcodeFilterString = req.query.zipcode
    let agenciesResponse = []


    if ( zipcodeFilterString != null && zipcodeFilterString !== '') {
        agenciesResponse = agencies.filter((element) => {
            return element["PLZ"].includes(zipcodeFilterString)
        } 
    )
    } else if ( filterString != null && filterString !== '') {
        agenciesResponse = agencies.filter((element) => {
            return element["Bezeichnung"].toLowerCase().includes(filterString.toLowerCase()) ||
                element["AA Bezirk"].toLowerCase().includes(filterString.toLowerCase()) ||
                element["Ort"].toLowerCase().includes(filterString.toLowerCase())
        } 
    )
    } else {
        agenciesResponse = agencies
    }

    res.send(JSON.stringify(agenciesResponse))
}
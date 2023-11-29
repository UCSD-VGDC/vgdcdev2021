
export default function gapiLoaded() {
    window.gapi.load('client', initializeGapiClient)
}

async function initializeGapiClient() {
    console.log("initializing");
    await window.gapi.client.init({
        'apiKey': process.env.API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        console.log("gapi initialized");
        readEvents();
    }).catch((error) => {
        console.log(error);
    })
}

async function readEvents() {
    window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: "1FRE3ddx0-WlZlvZ2iiMZnj6cYKpX3teIQrHngaBzoMs",
        range: 'Sheet1!A2:F'
    }).then((response) => {
        const values = response.result.values;
        if (values) {
            console.log(values)
        }
        else {
            console.log('no data')
        }
    }).catch((error) => {
        console.log(error)
    })
}

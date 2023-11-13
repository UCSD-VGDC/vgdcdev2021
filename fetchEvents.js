import { JWT } from "./node_modules/google-auth-library";
import { GoogleSpreadsheet } from "./node_modules/google-spreadsheet/src/index";
import credentials from './service_account.json';


 export async function fetchEvents() {

    const jwt = new JWT({
        email: credentials.client_email,
        private_key: credentials.private_key,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets'
        ]
    });

    
    const doc = new GoogleSpreadsheet(process.env.SPREADHSEET_ID, jwt);
    await doc.loadInfo();

    const eventsSheet = doc.sheetsByIndex[0];
    alert("eevnts data", eventsSheet.title);
}


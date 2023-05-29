import { google } from "googleapis";
import credentials from "./keys/ather-import-5188ff837cbe.json";
class GoogleSheetHelper {
  service = null;
  authClient = null;

  constructor() {
    // console.log('process.env.GOOGLE_SHEET_API_KEY', process.env.GOOGLE_SHEET_API_KEY);
    // const credentials: any = JSON.parse(process.env.GOOGLE_SHEET_API_KEY);
    this.service = google.sheets("v4");
    this.authClient = new google.auth.JWT(credentials.client_email, null, credentials.private_key, [
      "https://www.googleapis.com/auth/spreadsheets",
    ]);
  }

  async getSheetData() {
    try {
      // Authorize the client
      const token = await this.authClient.authorize();

      // Set the client credentials
      this.authClient.setCredentials(token);

      // Get the rows
      const res = await this.service.spreadsheets.values.get({
        auth: this.authClient,
        spreadsheetId: "1tCetgOujq5y3HTuUSMxKw0MiQvGQbr0vNLZQlJF0Okk",
        range: "A:Z",
      });

      // Set rows to equal the rows
      const rows = res.data.values;
      return rows;
      // Saved the answers
    } catch (error) {
      // Log the error
      console.log("GoogleSheetHelper error", error);
    }
  }
}

export const googleSheetHelper = new GoogleSheetHelper();

// (async () => {
//   console.log("google sheet here");
//   await googleSheetHelper.getSheetData();
// })();

//https://docs.google.com/forms/d/11vf_U2oJPIIVwtwv9UbTm2ialkHjrfcnVoDlZm-vi14/edit
//https://docs.google.com/spreadsheets/d/1nwN_JdLrldxwoBwsu03gRy4OdOJDh_TYFjaeX6DUJfc/edit?resourcekey#gid=1126566805

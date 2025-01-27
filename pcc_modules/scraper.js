// const { debug } = require('puppeteer');
const puppeteer = require('puppeteer');

// TODO - add error catching

module.exports = {
  get_code: async (postcode, debug_mode = false) => {
    try {
      const url = `https://www.odsdatasearchandexport.nhs.uk/?search=generalorg&query=${encodeURIComponent(postcode)}`;
      
      // default postcode for initial testing, only used if called with true on second arg
      if (debug_mode) {
        postcode = "NR5 0GB" //"LN2 5HR"
      }
      
      const browser = await puppeteer.launch({headless: true});
      const headless_page = await browser.newPage();

      // is waiting for zero connections going to cause timeout issues? exceeds 30000ms on testing on a non-GP postcode 
      // 26-01-25, updated to 2 connection idle wait for balance between responsiveness and functionality
      await headless_page.goto(url, { waitUntil: 'networkidle2' });
      // error handling needs sorting - this will cause a crash if an invalid postcode is given because the css selector never appears
      await headless_page.waitForSelector('.MuiDataGrid-row');
      
      // Find records in the dynamic table to pass to mapping func, the result of which is then assigned to the const row
      // MuiDataGrid == Material-UI DataGrid
      // $$Eval runs through all the rows, and then .map runs the function on each row
      const rows = await headless_page.$$eval('.MuiDataGrid-row', (rows) => {
        return rows.map((row) => {
          // row_role is the cell within the 'Primary Role Name' (css id 'primaryRoleName') field
          // row_code is the cell within the 'Code' (css id 'id') field
          const row_role = row.querySelector('[data-field="primaryRoleName"]');
          const row_code = row.querySelector('[data-field="id"]');  
          
          // .trim is for rstrip/lstrip whitespace
          // ? ternary is to check if is truthy (i.e. exists), and : '' is to assign empty string if it doesn't
          const code = row_code ? row_code.innerText.trim() : '';
          const role = row_role ? row_role.innerText.trim() : '';
          const is_pcc = role == "PRESCRIBING COST CENTRE" ? true : false;

          return {
            code, role, is_pcc
          };
        })});

        // prep output
        let output = []
        rows.forEach((row) => {
          output.push(JSON.stringify(row, null, 2))
        });

        // close & output
        await browser.close();
        return output
    
    // try/catch change
  } catch(error) {
    console.error('Error fetching data:', error.message);
    // don't throw error, return nil JSON or error code?
    throw new Error('Failed to fetch data for the given postcode.');
  }

// get_code close
  }
  // module.epxort close
}

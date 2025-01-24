// const { debug } = require('puppeteer');
const puppeteer = require('puppeteer');

module.exports = {
  get_code: async (postcode, debug_mode = false) => {
    try {
      const url = `https://www.odsdatasearchandexport.nhs.uk/?search=generalorg&query=${encodeURIComponent(postcode)}`;
      
      // default postcode for initial testing
      if (debug_mode) {
        postcode = "LN2 5HR"
      }
      
      const browser = await puppeteer.launch({headless: false});
      const headless_page = await browser.newPage();

      await headless_page.goto(url, { waitUntil: 'networkidle0' });
      await headless_page.waitForSelector('.MuiDataGrid-row');
      
      // Find records in the dynamic table to pass to mapping func, the result of which is then assigned to the const row
      const rows = await headless_page.$$eval('.MuiDataGrid-row', (rows) => {
        return rows.map((row) => {
          // current css selector is the toggle/dropdown (where attribute of data-field matches '__detail_panel_toggle__' which I think is incorrect so needs investigating)
          // roleCell is the first cell in the row to match
          const roleCell = row.querySelector('[data-field="__detail_panel_toggle__"]');
          // roleName is the output from the map, objects returned contain the roleName
          // .trim rstrip/lstrip whitespace
          // ? ternary is to check if roleCell is truthy (i.e. exists), and : '' is to assign empty string if it doesn't
          const roleName = roleCell ? roleCell.innerText.trim() : '';
          return {
            roleName
          };
        })});

        // debugging
        rows.forEach((row, index) => {
          console.log(`Row ${index}: ${JSON.stringify(row, null, 2)}`);
        });

        // close & output
        await browser.close();
        return "test successful"
    
    // try/catch change
  } catch(error) {
    console.error('Error fetching data:', error.message);
    throw new Error('Failed to fetch data for the given postcode.');
  }

// get_code close
  }
  // module.epxort close
}

      
      /*
      // open the page, then wait until things stop loading
      // await headless_page.goto(url, { waitUntil: 'load' });
      await headless_page.goto(url, { waitUntil: 'networkidle0' });
      
      // Lookup for the selector
      try {
        await headless_page.waitForSelector(selector, { timeout: 5000 })
        // ...
      } catch (error) {
        console.log("The element didn't appear.")
      }
        */

      /*
      //testing
      console.log("about to call")
      // debugger
      await headless_page.goto('https://brightdata.com/blog');
      const data = await headless_page.evaluate( () => {
        console.log("called")
        let data = [];
        const titles = document.querySelectorAll('.brd_post_entry');
      
        for (const title of titles) {
          const titleText = title.querySelector('.brd_post_title').textContent;
          const titleLink = title.href;
      
          const article = { title: titleText, link: titleLink };
          data.push(article);
        }
        return data;
      
      })
        */
        

const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  get_code: async (postcode) => {
    try {
        debugger
      // Construct the URL
      const url = `https://www.odsdatasearchandexport.nhs.uk/?search=generalorg&query=${encodeURIComponent(postcode)}`;
      
      // Fetch the page content
      const { data: html } = await axios.get(url);
      
      // Load the HTML into cheerio
      const $ = cheerio.load(html);
      
      // Define an array to store the codes
      const codes = [];
      
      // Select the rows in the table (assumes a standard structure)
      $('#searchResults tbody tr').each((_, row) => {
        const cells = $(row).find('td');
        const code = $(cells[0]).text().trim(); // Code is in the first column
        const primaryRoleName = $(cells[3]).text().trim(); // Primary Role Name in the fourth column
        
        // Check if the primary role name matches "PRESCRIBING COST CENTRE"
        if (primaryRoleName === 'PRESCRIBING COST CENTRE') {
          codes.push(code);
        }
      });
      
      console.log(`returning ${codes}`)
      // Return the array of matching codes
      return codes.length ? codes : null;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw new Error('Failed to fetch data for the given postcode.');
    }
  },
};

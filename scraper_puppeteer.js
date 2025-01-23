const puppeteer = require('puppeteer');

module.exports = {
  get_code: async (postcode, debug_mode = false) => {
    try {
      const url = `https://www.odsdatasearchandexport.nhs.uk/?search=generalorg&query=${encodeURIComponent(postcode)}`;
      
      // default postcode for initial testing
      if (debug_mode) {
        postcode = "LN2 5HR"
      }

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      
      // open the page, then wait until things stop loading
      // await page.goto(url, { waitUntil: 'load' });
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      // close & output
      await browser.close();
      return "test successful"

    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw new Error('Failed to fetch data for the given postcode.');
    }
  },
};

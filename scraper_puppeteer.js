const puppeteer = require('puppeteer');

module.exports = {
  get_code: async (postcode) => {
    try {
      const url = `https://www.odsdatasearchandexport.nhs.uk/?search=generalorg&query=${encodeURIComponent(postcode)}`;

      // Launch Puppeteer browser
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to the URL
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Wait for the table rows to load
      await page.waitForSelector('#searchResults tbody tr');

      // Extract the data
      const codes = await page.evaluate(() => {
        const rows = document.querySelectorAll('#searchResults tbody tr');
        const results = [];

        rows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          const code = cells[0]?.innerText.trim(); // Code column
          const primaryRole = cells[3]?.innerText.trim(); // Primary Role Name column

          if (primaryRole === 'PRESCRIBING COST CENTRE') {
            results.push(code);
          }
        });

        return results;
      });

      // Close the browser
      await browser.close();

      return codes.length ? codes : null;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw new Error('Failed to fetch data for the given postcode.');
    }
  },
};

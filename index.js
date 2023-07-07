const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/updateProducts', (req, res) => {
  // Perform the necessary logic to update the product information

  // Products data received from the API request
  const products = req.body;

  // Update the HTML content using DOM manipulation
  const filePath = path.join(__dirname, 'public', 'index.html');
  const html = fs.readFileSync(filePath, 'utf-8');

  const cheerio = require('cheerio');
  const $ = cheerio.load(html);

  // Update the product information
  for (const productId in products) {
    const newPrice = products[productId];

    $(`#product-${productId} .card-text`).text(`Rs ${newPrice}`);
  }

  // Save the modified HTML content back to the file
  fs.writeFileSync(filePath, $.html());

  // Send the response
  res.send('Product information updated successfully!');
});

// Create an HTTPS server using a self-signed certificate
const options = {
  key: fs.readFileSync(path.join(__dirname,'private-key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'certificate.pem')),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});

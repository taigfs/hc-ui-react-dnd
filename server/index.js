import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/open-url', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  console.log('URL opened successfully');
  await browser.close();
  res.send('URL opened successfully');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

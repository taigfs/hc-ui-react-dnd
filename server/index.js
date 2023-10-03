import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/open-url', async (req, res) => {
  // curl -X POST -H "Content-Type: application/json" -d '{"url":"http://example.com"}' "http://your-api-server.com/open-url"

  const targetUrl = req.body.url;
  const instanceId = req.body.instanceId;

  // Verificar se a URL é válida
  if (!targetUrl) {
    return res.status(400).send('targetUrl is required as a query parameter.');
  }

  // Verificar se o instanceId é válido
  if (!instanceId) {
    return res.status(400).send('instanceId is required as a query parameter.');
  }

  try {
    
    const browser = await puppeteer.launch({ headless: false }); // Desativa o modo headless

    const page = await browser.newPage();
    
    await page.goto(targetUrl);
    await page.waitForTimeout(1000);

    // Move the mouse to the username input and click
    await page.waitForSelector('#username');
    await page.click('#username');
    await page.waitForTimeout(1000);

    // Type the username
    await page.keyboard.type('tomsmith');
    await page.waitForTimeout(1000);

    // Move the mouse to the password input and click
    await page.waitForSelector('#password');
    await page.click('#password');
    await page.waitForTimeout(1000);

    // Type the password
    await page.keyboard.type('SuperSecretPassword!');
    await page.waitForTimeout(1000);

    // Move the mouse to the login button and click
    await page.waitForSelector('.radius');
    await page.click('.radius');

    await page.waitForTimeout(5000);

    console.log('Actions performed successfully');
    await browser.close();
    res.send('Actions performed successfully');
  } catch (error) {
    console.error('Error performing actions:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/open-url', async (req, res) => {
  // curl "http://your-api-server.com/open-url?url=http://example.com"

  const targetUrl = req.query.url;

  // Verificar se a URL é válida
  if (!targetUrl) {
    return res.status(400).send('targetUrl is required as a query parameter.');
  }

  try {
    
    const browser = await puppeteer.launch({ headless: false }); // Desativa o modo headless

    const page = await browser.newPage();
    
    await page.goto(targetUrl);
    await page.waitForTimeout(1000);

    console.log('Actions performed successfully');
    res.send('Actions performed successfully');
    return;

    // Move o mouse até o input de pesquisa e clica
    await page.waitForSelector('input[name="q"]');
    await page.click('input[name="q"]');
    await page.waitForTimeout(1000);

    // Digita a string no input
    await page.keyboard.type('o que são agentes autonomos?');
    await page.waitForTimeout(1000);

    // Move o mouse até o botão de pesquisa e clica
    await page.waitForSelector('input[name="btnK"]');
    await page.click('input[name="btnK"]');

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

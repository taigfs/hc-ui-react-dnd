import express from 'express';
import puppeteer from 'puppeteer';
import { MemoryCache } from './MemoryCache.js';
import cors from 'cors';

const app = express();
const port = 3001;

const cache = new MemoryCache();
const humanDelay = 500;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/open', async (req, res) => {
  // curl -X POST -H "Content-Type: application/json" -d '{"url":"http://example.com"}' "http://your-api-server.com/open"

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

    let browser = null;
    let page = null;
    
    // Verificar se o browser já está aberto
    if (cache.get(instanceId)) {
      console.log('Browser already open');
      const { browser: curBrowser, page: curPage } = cache.get(instanceId);
      browser = curBrowser;
      page = curPage;
    } else {
      console.log('Opening browser');
      browser = await puppeteer.launch({ headless: false }); // Desativa o modo headless
      var [curPage] = await browser.pages();
      page = curPage;
      cache.set(instanceId, { browser, page });
    }
    
    await page.goto(targetUrl);
    await page.waitForTimeout(humanDelay);

    console.log('Actions performed successfully');
    res.send('Actions performed successfully');
  } catch (error) {
    console.error('Error performing actions:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/type', async (req, res) => {
  const { selector, text, instanceId } = req.body;
  if (!selector || !text || !instanceId) {
    return res.status(400).send('Selector, text, and instanceId are required.');
  }
  const { page } = cache.get(instanceId);
  if (!page) {
    return res.status(400).send('Invalid instanceId.');
  }
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.type(text);
  await page.waitForTimeout(humanDelay);
  res.send('Type action performed successfully');
});

app.post('/click', async (req, res) => {
  const { selector, instanceId } = req.body;
  if (!selector || !instanceId) {
    return res.status(400).send('Both selector and instanceId are required.');
  }
  const { page } = cache.get(instanceId);
  if (!page) {
    return res.status(400).send('Invalid instanceId.');
  }
  await page.waitForSelector(selector);
  await page.click(selector);
  await page.waitForTimeout(humanDelay);
  res.send('Click action performed successfully');
});

app.post('/close', async (req, res) => {
  const { instanceId } = req.body;
  if (!instanceId) {
    return res.status(400).send('instanceId is required.');
  }
  const { browser } = cache.get(instanceId);
  if (!browser) {
    return res.status(400).send('Invalid instanceId.');
  }
  await browser.close();
  cache.set(instanceId, null);
  res.send('Browser closed successfully');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

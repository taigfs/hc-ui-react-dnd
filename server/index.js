import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

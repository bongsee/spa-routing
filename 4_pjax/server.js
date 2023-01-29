const express = require('express');
const path = require('path');

const app = express();
const port = 5004;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/:page', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, `data/${page}.json`));
})

// 페이지 새로고침을 위한 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(port, () => {
  console.log(`Listening on https:/localhost:${port}`);
})
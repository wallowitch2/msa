const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('view', { welcomeMessage: '환영합니다 nodejs 입니다' });
});

const runApp = () => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
      resolve(server);
    });
  });
};

module.exports = runApp;

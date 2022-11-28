var express = require('express');
var app = express();
var cors = require('cors');

const PORT = process.env.PORT || 5050;
const isDev = process.env.NODE_ENV !== 'production';

const isValidDate = date => date instanceof Date && !isNaN(date);
 
app
  .use(cors({optionsSuccessStatus: 200}));

app
  .get("/", function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  })
  .get("/api/:date?", ({params}, res) => {
    let _date = +params.date;

    if (isNaN(_date))
      _date = params.date;

    const date = _date ? new Date(_date) : new Date();

    const isValid = isValidDate(date);

    if (!isValid)
      return res.status(400).json({error: "Invalid Date"});

      res.json({
        unix: +date,
        utc: date.toUTCString()
      });
  });

if (isDev) 
  app.listen(PORT, function () {
    console.log('Your app is listening on port ' + PORT);
  });
else
  module.exports = app;

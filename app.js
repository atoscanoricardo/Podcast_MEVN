const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback')
const mongoose = require('./bin/connect')


//app.use(history);
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.use('/api', require('./bin/routes/Users'));


app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function() {
    console.log('Example app listening on port ' + app.get('puerto'));
});
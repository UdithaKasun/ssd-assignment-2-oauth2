const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser');
const nocache = require('nocache');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const SESSION_IDS = new Map();
  // Applying middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(nocache());

// Views
app.use(express.static('views'));

app.post('/token', (req, res) => {
    axios.post('https://github.com/login/oauth/access_token', {
        "client_id": "292e6e8eb271616559bb",
        "client_secret": "803bc718baf2a3960d4eb13695a64543976fa0a7",
        "code": req.body.code,
        "redirect_uri": "http://localhost:4200/posts",
        "state": "111111"
      })
        .then(function (response) {
          console.log(response.data.split('&')[0].split('=')[1]);
          res.send({ "access_token": response.data.split('&')[0].split('=')[1] })
        })
        .catch(function (error) {
          console.log(error);
        });
});

app.post('/data', (req, res, next) => {
    axios.get('https://api.github.com/user?access_token='+req.body.accessToken)
      .then(function (data) {
        res.send(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
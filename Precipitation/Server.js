var express = require('express');
var bodyParser = require('body-parser');
var precipitation = express();
var router = express.Router();
var pg = require('pg');
var client = new pg.Client({ database: "freshwater_dev" });
;

router.get('/users', function(req, res) {
  client.connect(function(err) {
    if (err) throw err;
    client.query("SELECT * FROM users", function(err, result) {
      if (err) {
        throw err;
      } else {
        console.log(result.rows);
        res.json({ rows: result.rows });
      }
    });
  });
});

precipitation.use('/api', router);
precipitation.use(bodyParser.urlencoded({ extended: true }));
precipitation.use(bodyParser.json());

precipitation.listen(8080);

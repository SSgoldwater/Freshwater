var express = require('express');
var bodyParser = require('body-parser');
var precipitation = express();
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: "Making it pour" });
});

precipitation.use('/api', router);
precipitation.use(bodyParser.urlencoded({ extended: true }));
precipitation.use(bodyParser.json());

precipitation.listen(8080);

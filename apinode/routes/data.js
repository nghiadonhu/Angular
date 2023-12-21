var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',function(req,res){
    var mang = ['cam','quyt','Buoi'];
    res.json(mang);
})
router.get('/obj',function(req,res){
    var obj = {'id':1,'name':'Buoi','gia':10000};
    res.json(obj);
})
router.get('/mobj',function(req,res){
    var mobj =[ {'id':1,'name':'Buoi','gia':10000},
                {'id':2,'name':'Cam','gia':200},
                ]
    res.json(mobj);
})

router.get('/ptb2', function (req, res) {
   
    var a = parseFloat(req.query.a); // Assuming 'a' is provided as a query parameter
    var b = parseFloat(req.query.b);
    var c = parseFloat(req.query.c);
  
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      res.status(400).json({ error: 'Invalid input. Please provide valid coefficients.' });
      return;
    }
  
    var delta = b * b - 4 * a * c;
    if (delta < 0) {
      res.json({ result: 'Phuong trinh vo nghiem' });
    } else {
      var x1 = (-b - Math.sqrt(delta)) / (2 * a);
      var x2 = (-b + Math.sqrt(delta)) / (2 * a);
  
      if (x1 === x2) {
        res.json({ result: `Phuong trinh co nghiem kep\nX1=X2=${x1}` });
      } else {
        res.json({ result: `Phuong trinh co 2 nghiem phan biet\nX1=${x1}\nX2=${x2}` });
      }
    }
  });

module.exports = router;

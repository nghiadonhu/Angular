const mysql = require('mysql');

var express = require('express');

var router = express.Router();
const fileUpload = require('express-fileupload');

router.use(fileUpload());
var path = require('path')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'doan5',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

router.get('/api/sanpham', (req, res) => {
  // Thực hiện các truy vấn MySQL ở đây
  connection.query('SELECT * FROM sanpham', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error });
      return;
    }
    res.json(results);
  });
});

router.get('/', function (req, res) {
  var mang = ['cam', 'quyt', 'Buoi'];
  res.json(mang);
})
router.get('/obj', function (req, res) {
  var obj = { 'id': 1, 'name': 'Buoi', 'gia': 10000 };
  res.json(obj);
})
router.get('/mobj', function (req, res) {
  var mobj = [{ 'id': 1, 'name': 'Buoi', 'gia': 10000 },
  { 'id': 2, 'name': 'Cam', 'gia': 200 },
  ]
  res.json(mobj);
})
router.post('/ptb2', function (req, res) {

  // Lấy giá trị a, b, c từ phần thân của yêu cầu
  var a = req.body.a;
  var b = req.body.b;
  var c = req.body.c;

  // Tính delta và giải phương trình bậc 2
  var delta = b * b - 4 * a * c;
  if (delta < 0) {
    res.json({ result: 'Phương trình vô nghiệm' });
  } else {
    var x1 = (-b - Math.sqrt(delta)) / (2 * a);
    var x2 = (-b + Math.sqrt(delta)) / (2 * a);

    if (x1 === x2) {
      res.json({ result: `Phương trình có nghiệm kép\nX1=X2=${x1}` });
    } else {
      res.json({ result: `Phương trình có 2 nghiệm phân biệt\nX1=${x1}\nX2=${x2}` });
    }
  }
});

router.post('/tong1n', function (req, res) {
  // Lấy giá trị n từ phần thân của yêu cầu
  var n = parseInt(req.body.n);

  // Kiểm tra xem giá trị n có là số không
  if (isNaN(n) || n < 0) {
    res.json({ result: 'Vui lòng cung cấp một số nguyên dương.' });
    return;
  }

  // Tính tổng từ 1 đến n
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }

  res.json({ result: `Tổng từ 1 đến ${n} là ${sum}` });
});
  

router.post('/ptb1', function (req, res) {
  // Lấy giá trị a và b từ phần thân của yêu cầu
  var a = req.body.a;
  var b = req.body.b;

  // Giải phương trình bậc 1 ax + b = 0
  if (a === 0) {
    // Nếu a bằng 0, phương trình vô nghiệm hoặc vô số nghiệm
    if (b === 0) {
      res.json({ result: 'Phương trình vô số nghiệm' });
    } else {
      res.json({ result: 'Phương trình vô nghiệm' });
    }
  } else {
    var x = -b / a;
    res.json({ result: `Nghiệm của phương trình là X = ${x}` });
  }
});

var public = path.join(__dirname, '../public');

router.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Khong co file upload.');
  }

  sampleFile = req.files.Anh;
  uploadPath = public + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    // Trả về tên file thành công
    res.json({ filename: sampleFile.name });
  });
});
// router.post('/upload', function (req, res) {
//   let sampleFile;
//   let uploadPath;
  
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('Khong co file upload.');
//   }
  
//   sampleFile = req.files.Anh;
//   uploadPath = public + '/uploads/' + sampleFile.name;
  
//   sampleFile.mv(uploadPath, function (err) {
//     if (err) {
//       return res.status(500).send(err);
//     }
    
   
//     res.json({ filename: sampleFile.name });
//   });
// });


// var public = path.join(__dirname, '../public');
// router.post('/upload', function (req, res) {
//   let sampleFile;
//   let uploadPath;
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('Khong co file upload.');
//   }
//   console.log('den day');
//   sampleFile = req.files.Anh;
//   uploadPath = public + '/uploads/' + sampleFile.name;
//   console.log(uploadPath);
//   sampleFile.mv(uploadPath, function (err) {
//     if (err)
//       return res.status(500).send(err);
//     res.send('File uploaded!');
//   });
// })
module.exports = router;



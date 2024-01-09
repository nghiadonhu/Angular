var router = require('express')();
var db = require('./dbconnect');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'nghia';
router.get('/users',(req,res)=>{
    var query = 'Select * from users'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/users/get-one/:id',function(req,res){
    var query = "Select * from users where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update users set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/users/edit/:id', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
    var id = req.params.id;
   
    var query = "UPDATE users SET name=?,email=?,password=?,updated_at=NOW()  WHERE id = ?";
    
    db.query(query, [name,email,password,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/users/add', function(req, res) {
   
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
    
  var query = "INSERT INTO users(name, email, password, created_at, updated_at) VALUES (?,?,?,NOW(),NOW())";
    
    db.query(query, [name, email, password], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});



router.get("/users/remove/:id", function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM users WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
    }
  
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [name], async (error, results) => {
      if (error) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', error);
        return res.status(500).json({ message: 'Lỗi kết nối cơ sở dữ liệu.' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
      }
  
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
  
      if (match) {
        const tokenPayload = { id: user.id, name: user.name };
        const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
  
        res.json({ message: 'Đăng nhập thành công', token });
      } else {
        res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });
      }
    });
  });
  
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
     
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const insertQuery = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;
  
      db.query(insertQuery, [name, email, hashedPassword], (error, result) => {
        if (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Send a success response
          res.status(201).json({ message: 'User registered successfully!' });
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports=router;
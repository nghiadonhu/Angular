var router = require('express')();
var db = require('./dbconnect');

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

module.exports=router;
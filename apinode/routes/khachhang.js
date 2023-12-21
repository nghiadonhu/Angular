var router = require('express')();
var db = require('./dbconnect');

router.get('/kh',(req,res)=>{
    var query = 'Select * from khachhang'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/khachhang/get-one/:id',function(req,res){
    var query = "Select * from khachhang where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update khachhang set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/khachhang/edit/:id', function(req, res) {
    var Tenkhachhang = req.body.Tenkhachhang;
    var Anhdaidien = req.body.Anhdaidien;
    var Ngaysinh = req.body.Ngaysinh;
    var Sdt = req.body.Sdt;
    var Diachi = req.body.Diachi;
    var Email = req.body.Email;
    var id = req.params.id;

    // var query = "UPDATE khachhang SET Tenloai = ?, updated_at = NOW() WHERE id = ?";
    var query = "UPDATE khachhang SET Tenkhachhang=?,Anhdaidien=?,Ngaysinh=?,Sdt=?,Diachi=?,Email=?,updated_at=NOW()  WHERE id = ?";
    
    db.query(query, [Tenkhachhang,Anhdaidien,Ngaysinh,Sdt,Diachi,Email,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/khachhang/add', function(req, res) {
   
    var Tenkhachhang = req.body.Tenkhachhang;
    var Anhdaidien = req.body.Anhdaidien;
    var Ngaysinh = req.body.Ngaysinh;
    var Sdt = req.body.Sdt;
    var Diachi = req.body.Diachi;
    var Email = req.body.Email;
   
   

    var query = "INSERT INTO khachhang(Tenkhachhang, Anhdaidien, Ngaysinh, Sdt, Diachi, Email, created_at, updated_at) VALUES (?,?,?,?,?,?,NOW(),NOW())";
    
    db.query(query, [Tenkhachhang, Anhdaidien, Ngaysinh, Sdt, Diachi, Email], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from khachhang where id ='+ req
// })

router.get("/khachhang/remove/:id", function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM khachhang WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

module.exports=router;
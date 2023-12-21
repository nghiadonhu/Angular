var router = require('express')();
var db = require('./dbconnect');

router.get('/nv',(req,res)=>{
    var query = 'Select * from nhanvien'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/nhanvien/get-one/:id',function(req,res){
    var query = "Select * from nhanvien where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update nhanvien set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/nhanvien/edit/:id', function(req, res) {
    var Tennhanvien = req.body.Tennhanvien;
    var Ngaysinh = req.body.Ngaysinh;
    var Sdt = req.body.Sdt;
    var Diachi = req.body.Diachi;
    var Email = req.body.Email;
    var Anh = req.body.Anh;
    var id = req.params.id;

    // var query = "UPDATE nhanvien SET Tenloai = ?, updated_at = NOW() WHERE id = ?";
    var query = "UPDATE nhanvien SET Tennhanvien=?,Ngaysinh=?,Sdt=?,Diachi=?,Email=?,Anh=?,updated_at=NOW()  WHERE id = ?";
    
    db.query(query, [Tennhanvien,Ngaysinh,Sdt,Diachi,Email,Anh,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/nhanvien/add', function(req, res) {
   
    var Tennhanvien = req.body.Tennhanvien;
    var Ngaysinh = req.body.Ngaysinh;
    var Sdt = req.body.Sdt;
    var Diachi = req.body.Diachi;
    var Email = req.body.Email;
    var Anh = req.body.Anh;
   
   

    var query = "INSERT INTO nhanvien(Tennhanvien, Ngaysinh, Sdt, Diachi, Email,Anh, created_at, updated_at) VALUES (?,?,?,?,?,?,NOW(),NOW())";
    
    db.query(query, [Tennhanvien, Ngaysinh, Sdt, Diachi, Email,Anh], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from nhanvien where id ='+ req
// })

router.get("/nhanvien/remove/:id", function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM nhanvien WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

module.exports=router;
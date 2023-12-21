var router = require('express')();
var db = require('./dbconnect');

router.get('/tintuc',(req,res)=>{
    var query = 'Select * from tintuc'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/tintuc/get-one/:id',function(req,res){
    var query = "Select * from tintuc where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update tintuc set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/tintuc/edit/:id', function(req, res) {
    var Nhanvien_id = req.body.Nhanvien_id;
    var Ngaynhap = req.body.Ngaynhap;
    var Anh = req.body.Anh;
    var Mota = req.body.Mota;
    var Tentieude = req.body.Tentieude;
    var id = req.params.id;
    // var query = "UPDATE tintuc SET Tenloai = ?, updated_at = NOW() WHERE id = ?";
    var query = "UPDATE tintuc SET Nhanvien_id=?,Ngaynhap=?,Anh=?,Mota=?,Tentieude=?,updated_at=NOW()  WHERE id = ?";
    
    db.query(query, [Nhanvien_id,Ngaynhap,Anh,Mota,Tentieude,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/tintuc/add', function(req, res) {
   
    var Nhanvien_id = req.body.Nhanvien_id;
    var Ngaynhap = req.body.Ngaynhap;
    var Anh = req.body.Anh;
    var Mota = req.body.Mota;
    var Tentieude = req.body.Tentieude;
    
   
   

    var query = "INSERT INTO tintuc(Nhanvien_id, Ngaynhap, Anh, Mota, Tentieude, created_at, updated_at) VALUES (?,?,?,?,?,NOW(),NOW())";
    
    db.query(query, [Nhanvien_id, Ngaynhap, Anh, Mota, Tentieude], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from tintuc where id ='+ req
// })

router.get("/tintuc/remove/:id", function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM tintuc WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

module.exports=router;
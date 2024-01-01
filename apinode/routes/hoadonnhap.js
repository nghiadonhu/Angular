var router = require('express')();
var db = require('./dbconnect');

router.get('/hoadonnhap',(req,res)=>{
    var query = 'Select * from hoadonnhap'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/cthdn',(req,res)=>{
    var query = 'Select * from cthdn'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/hoadonnhap/get-one/:id',function(req,res){
    var query = "Select * from hoadonnhap where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});

router.get('/cthdn/get-one/:id',function(req,res){
    var query = "Select * from cthdn where Hoadonnhap_id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
  });
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update hoadonnhap set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/hoadonnhap/edit/:id', function(req, res) {
    var Nhanvien_id = req.body.Nhanvien_id;
    var Thanhtien= req.body.Thanhtien;
    var Ngaynhap = req.body.Ngaynhap;
    var Ncc_id = req.body.Ncc_id;
    var id = req.params.id;
    // var query = "UPDATE hoadonnhap SET Tenloai = ?, updated_at = NOW() WHERE id = ?";
    var query = "UPDATE hoadonnhap SET Nhanvien_id=?,Thanhtien=?,Ngaynhap=?,Ncc_id=?,updated_at=NOW()  WHERE id = ?";
    
    db.query(query, [Nhanvien_id,Thanhtien,Ngaynhap,Ncc_id,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/hoadonnhap/add', function(req, res) {
   
    var Nhanvien_id = req.body.Nhanvien_id;
    var Thanhtien= req.body.Thanhtien;
    var Ngaynhap = req.body.Ngaynhap;
    var Ncc_id = req.body.Ncc_id;
    
    
   
   

    var query = "INSERT INTO hoadonnhap(Nhanvien_id,Thanhtien, Ngaynhap, Ncc_id,created_at, updated_at) VALUES (?,?,?,?,NOW(),NOW())";
    
    db.query(query, [Nhanvien_id,Thanhtien, Ngaynhap, Ncc_id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from hoadonnhap where id ='+ req
// })

router.get("/hoadonnhap/remove/:id", function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM hoadonnhap WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.post('/cthdn/add', function(req, res) {
   
//     var Hoadonnhap_id = req.body.Hoadonnhap_id;
//     var Sanpham_id= req.body.Sanpham_id;
//     var Dongia = req.body.Dongia;
//     var Soluong = req.body.Soluong;
    
//     var query = "INSERT INTO cthdn(Hoadonnhap_id, Sanpham_id, Dongia, Soluong,created_at, updated_at) VALUES (?,?,?,?,NOW(),NOW())";
    
//     db.query(query, [Hoadonnhap_id,Sanpham_id, Dongia, Soluong], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Lỗi truy vấn');
//         }
//         res.json(result);
//     });
// });

// router.post('/cthdn/add', function(req, res) {
//     var Hoadonnhap_id = req.body.Hoadonnhap_id;
//     var Sanpham_id = req.body.Sanpham_id;
//     var Dongia = req.body.Dongia;
//     var Soluong = req.body.Soluong;

//     // Tạo câu truy vấn để thêm chi tiết hóa đơn nhập
//     var insertQuery = "INSERT INTO cthdn(Hoadonnhap_id, Sanpham_id, Dongia, Soluong, created_at, updated_at) VALUES (?,?,?,?,NOW(),NOW())";

//     db.query(insertQuery, [Hoadonnhap_id, Sanpham_id, Dongia, Soluong], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Lỗi truy vấn');
//         }

//         // Cập nhật số lượng trong bảng sanpham sau khi thêm chi tiết hóa đơn nhập
//         var updateQuery = "UPDATE sanpham SET Soluong = Soluong + ? WHERE id = ?";
        
//         db.query(updateQuery, [Soluong, Sanpham_id], function(err, updateResult) {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Lỗi truy vấn cập nhật số lượng');
//             }
            
//             res.json(result);
//         });
//     });
// });

router.post('/cthdn/add', function(req, res) {
    var Hoadonnhap_id = req.body.Hoadonnhap_id;
    var Sanpham_id = req.body.Sanpham_id;
    var Dongia = req.body.Dongia;
    var Soluong = req.body.Soluong;

    // Tạo câu truy vấn để thêm chi tiết hóa đơn nhập
    var insertQuery = "INSERT INTO cthdn(Hoadonnhap_id, Sanpham_id, Dongia, Soluong, created_at, updated_at) VALUES (?,?,?,?,NOW(),NOW())";

    db.query(insertQuery, [Hoadonnhap_id, Sanpham_id, Dongia, Soluong], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }

        // Cập nhật số lượng trong bảng sanpham sau khi thêm chi tiết hóa đơn nhập
        var updateQuery = "UPDATE sanpham SET Soluong = Soluong + ? WHERE id = ?";

        db.query(updateQuery, [Soluong, Sanpham_id], function(err, updateResult) {
            if (err) {
                console.error(err);
                return res.status(500).send('Lỗi truy vấn cập nhật số lượng');
            }

            // Kiểm tra xem cập nhật thành công hay không
            if (updateResult.affectedRows > 0) {
                res.json(result);
            } else {
                res.status(500).send('Lỗi cập nhật số lượng sản phẩm');
            }
        });
    });
});



module.exports=router;
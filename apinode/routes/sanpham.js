var router = require('express')();
var db = require('./dbconnect');

router.get('/sp',(req,res)=>{
    var query = 'Select * from sanpham'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/sanpham/get-one/:id',function(req,res){
    var query = "Select * from sanpham where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update sanpham set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/sanpham/edit/:id', function(req, res) {
    var Maloai_id = req.body.Maloai_id;
    var Tensanpham = req.body.Tensanpham;
    var Anh = req.body.Anh;
    var Soluong = req.body.Soluong;
    var Gia = req.body.Gia;
    var Maluc = req.body.Maluc;
    var PhanKhuc = req.body.PhanKhuc;
    var VongTuaMay = req.body.VongTuaMay;
    var MoMenXoan = req.body.MoMenXoan;
    var Giakhuyenmai = req.body.Giakhuyenmai;
    var ViewCount = req.body.ViewCount;
    var ReducePrice = req.body.ReducePrice;
    var id = req.params.id;

    // var query = "UPDATE sanpham SET Tenloai = ?, updated_at = NOW() WHERE id = ?";
    var query = "UPDATE sanpham SET Maloai_id=?,Tensanpham=?,Anh=?,Soluong=?,Gia=?,Maluc=?,PhanKhuc=?,VongTuaMay=?,MoMenXoan=?,Giakhuyenmai=?,ViewCount=?,ReducePrice=?,updated_at=NOW()  WHERE id = ?";
    
    db.query(query, [Maloai_id,Tensanpham,Anh,Soluong,Gia,Maluc,PhanKhuc,VongTuaMay,MoMenXoan,Giakhuyenmai,ViewCount,ReducePrice,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/sanpham/add', function(req, res) {
    var Maloai_id = req.body.Maloai_id;
    var Tensanpham = req.body.Tensanpham;
    var Anh = req.body.Anh;
    var Soluong = req.body.Soluong;
    var Gia = req.body.Gia;
    var Maluc = req.body.Maluc;
    var PhanKhuc = req.body.PhanKhuc;
    var VongTuaMay = req.body.VongTuaMay;
    var MoMenXoan = req.body.MoMenXoan;
    var Giakhuyenmai = req.body.Giakhuyenmai;
    var ViewCount = req.body.ViewCount;
    var ReducePrice = req.body.ReducePrice;
   

    var query = "INSERT INTO sanpham(Maloai_id, Tensanpham, Anh, Soluong, Gia, Maluc, PhanKhuc, VongTuaMay, MoMenXoan, Giakhuyenmai, ViewCount, ReducePrice, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
    // INSERT INTO sanpham(id, Maloai_id, `Tensanpham`, `Anh`, `Soluong`, `Gia`, `Maluc`, `PhanKhuc`, `VongTuaMay`, `MoMenXoan`, `Giakhuyenmai`, `ViewCount`, `ReducePrice`, `created_at`, `updated_at`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]','[value-13]','[value-14]','[value-15]')
    db.query(query, [Maloai_id,Tensanpham,Anh,Soluong,Gia,Maluc,PhanKhuc,VongTuaMay,MoMenXoan,Giakhuyenmai,ViewCount,ReducePrice], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from sanpham where id ='+ req
// })

router.get("/sanpham/remove/:id", function(req, res) {
    var id = req.params.id;
    var query = "DELETE FROM sanpham WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});



module.exports=router;
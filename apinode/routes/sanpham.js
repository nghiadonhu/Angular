var router = require('express')();
var db = require('./dbconnect');

router.get('/sp',(req,res)=>{
    var query = 'Select * from sanpham'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.post('/create',(req,res) =>{
    let file;
    let uploadPath;
    if(!req.files){
        return res.status(500).json({error: "Upload anh loi 1"});
    }

    file = req.files.file;

    uploadPath = "D:\\DOAN5_angular\\DOAN5\\src\\assets\\home_ui\\img\\" + file.name;

    file.mv(uploadPath, function(err) {
        if (err) return res.status(500).json({error: "Upload anh loi 2"});
    })

    console.log(uploadPath);

    db.query("Insert into SanPham(TenSanPham,Anh,SoLuong,GiaTien, NoiDung, NoiDungChiTiet, mlsp, mncc) values('"+req.body.TenSanPham+"','"+file.name+"','"+req.body.SoLuong+"','"+req.body.GiaTien+"','"+req.body.NoiDung+"','"+req.body.NoiDungChiTiet+"','"+req.body.mlsp+"','"+req.body.mncc+"')",(err,rs)=>{
        if(err){
           return res.status(500).send(err)
        }
        return res.status(200).send({code:200,message:"Thêm thành công"})
    })
})


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


{/* <div class="tab-pane p-3 active preview" role="tabpanel" id="preview-1272">
      <label for="hoten">Anh</label>
      <div class="input-group mb-3"><span class="input-group-text" id="hoten">Tên loại</span>
        <input  class="form-control" type="file" placeholder="Nhap ten"  aria-label="Username" aria-describedby="basic-addon1" (change)="onFileSelected($event)"></div> */}

// router.post('/create', (req, res) => {
//     let file;
//     let uploadPath;
//     if (!req.files) {
//         return res.status(500).json({ error: "Upload anh loi 1" });
//     }

//     file = req.files.file;

//     uploadPath = "D:\\Users\\ACER\\app125201\\src\\assets\\img\\" + file.name;

//     file.mv(uploadPath, function (err) {
//         if (err) return res.status(500).json({ error: "Upload anh loi 2" });
//     })

//     console.log(uploadPath);

//     const sql = `
//         INSERT INTO sanpham(Maloai_id, Tensanpham, Anh, Soluong, Gia, Maluc, PhanKhuc, VongTuaMay, MoMenXoan, Giakhuyenmai, ViewCount, ReducePrice, created_at, updated_at)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

//     const values = [req.body.Maloai_id, req.body.TenSanPham, file.name, req.body.SoLuong, req.body.GiaTien, req.body.Maluc, req.body.PhanKhuc, req.body.VongTuaMay, req.body.MoMenXoan, req.body.Giakhuyenmai, req.body.ViewCount, req.body.ReducePrice];

//     db.query(sql, values, (err, rs) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         return res.status(200).send({ code: 200, message: "Thêm thành công" });
//     });
// });



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

    db.query(query, [Maloai_id, Tensanpham, Anh, Soluong, Gia, Maluc, PhanKhuc, VongTuaMay, MoMenXoan, Giakhuyenmai, ViewCount, ReducePrice], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


// router.post('/sanpham/add', function(req, res) {
//     var Maloai_id = req.body.Maloai_id;
//     var Tensanpham = req.body.Tensanpham;
//     var Anh = req.body.Anh;
//     var Soluong = req.body.Soluong;
//     var Gia = req.body.Gia;
//     var Maluc = req.body.Maluc;
//     var PhanKhuc = req.body.PhanKhuc;
//     var VongTuaMay = req.body.VongTuaMay;
//     var MoMenXoan = req.body.MoMenXoan;
//     var Giakhuyenmai = req.body.Giakhuyenmai;
//     var ViewCount = req.body.ViewCount;
//     var ReducePrice = req.body.ReducePrice;
   

//     var query = "INSERT INTO sanpham(Maloai_id, Tensanpham, Anh, Soluong, Gia, Maluc, PhanKhuc, VongTuaMay, MoMenXoan, Giakhuyenmai, ViewCount, ReducePrice, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
   
//     db.query(query, [Maloai_id,Tensanpham,Anh,Soluong,Gia,Maluc,PhanKhuc,VongTuaMay,MoMenXoan,Giakhuyenmai,ViewCount,ReducePrice], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Lỗi truy vấn');
//         }
//         res.json(result);
//     });
// });

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
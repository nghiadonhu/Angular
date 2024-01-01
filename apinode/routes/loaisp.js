var router = require('express')();
var db = require('./dbconnect');

router.get('/',(req,res)=>{
    var query = 'Select * from loaisanpham'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/get-one/:id',function(req,res){
    var query = "Select * from loaisanpham where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});

router.get('/get-list/:id', function(req, res) {
    var query = "SELECT * FROM sanpham WHERE Maloai_id = " + req.params.id;
    db.query(query, function(err, result) {
        if (err) {
            res.status(500).send('Lỗi câu lệnh truy vấn');
        } else {
            res.json(result);
        }
    });
});


// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update loaisanpham set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/edit/:id', function(req, res) {
    var Tenloai = req.body.Tenloai;
    var id = req.params.id;

    var query = "UPDATE loaisanpham SET Tenloai = ?, updated_at = NOW() WHERE id = ?";
    
    db.query(query, [Tenloai, id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/add', function(req, res) {
    var Tenloai = req.body.Tenloai;

    var query = "INSERT INTO loaisanpham (Tenloai, created_at, updated_at) VALUES (?, NOW(), NOW())";
    
    db.query(query, [Tenloai], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from loaisanpham where id ='+ req
// })

// router.get("/remove/:id", function(req, res) {
//     var id = req.params.id;
//     res.json(id);
//     var query = "DELETE FROM loaisanpham WHERE id = ?";

//     db.query(query, [id], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Lỗi truy vấn');
//         }
//         res.json(result);
//     });
// });

router.get("/remove/:id", function(req, res) {
    var id = req.params.id;
    
    var query = "DELETE FROM loaisanpham WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        
        res.json(result); // Gửi phản hồi sau khi truy vấn hoàn tất
    });
});

module.exports=router;
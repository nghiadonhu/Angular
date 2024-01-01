var router = require('express')();
var db = require('./dbconnect');

router.get('/ncc',(req,res)=>{
    var query = 'Select * from ncc'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/ncc/get-one/:id',function(req,res){
    var query = "Select * from ncc where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});
// router.post('/edit/:id',function(req,res){
//     var Tenloai = req.body.Tenloai;
//     var query = "update ncc set Tenloai ="+ Tenloai+"", update_at=NOW() where = id + req.params.id
//     db.query(query,function(err,result){
//         if (err) res.status(500).send('Loi truy van');
//         res.json(result);
//     })
// })



router.post('/ncc/edit/:id', function(req, res) {
    var Tenncc = req.body.Tenncc;
    var Diachi = req.body.Diachi;
    var Sdt = req.body.Sdt;
    var id = req.params.id;

    var query = "UPDATE ncc SET Tenncc=?,Diachi=?,Sdt=?, updated_at = NOW() WHERE id = ?";
    
    db.query(query, [Tenncc,Diachi,Sdt,id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});


router.post('/ncc/add', function(req, res) {
    var Tenncc = req.body.Tenncc;
    var Diachi = req.body.Diachi;
    var Sdt = req.body.Sdt;

    var query = "INSERT INTO ncc (Tenncc, Diachi, Sdt, created_at, updated_at) VALUES (?,?,?, NOW(), NOW())";
    
    db.query(query, [Tenncc,Diachi,Sdt], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        res.json(result);
    });
});

// router.get("/remove/:id",function(req,res){
//     var query = 'delete from ncc where id ='+ req
// })

// router.get("/remove/:id", function(req, res) {
//     var id = req.params.id;
//     res.json(id);
//     var query = "DELETE FROM ncc WHERE id = ?";

//     db.query(query, [id], function(err, result) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Lỗi truy vấn');
//         }
//         res.json(result);
//     });
// });

router.get("/ncc/remove/:id", function(req, res) {
    var id = req.params.id;
    
    var query = "DELETE FROM ncc WHERE id = ?";

    db.query(query, [id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Lỗi truy vấn');
        }
        
        res.json(result); // Gửi phản hồi sau khi truy vấn hoàn tất
    });
});

module.exports=router;
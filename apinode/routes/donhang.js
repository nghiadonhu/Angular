var router = require('express')();
var db = require('./dbconnect');

// router.post('/themdh', (req, res) => {
//   const {
//       Hoten,
//       Sdt,
//       Email,
//       Diachi,
//       Ngaydat,
//       Tongtien,
//       Sanphamjson,
//   } = req.body;

//   db.query(
//       'INSERT INTO DonHang (Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
//       [Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien],
//       (error, result) => {
//           if (error) {
//               console.error('Lỗi tạo đơn hàng: ' + error.message);
//               return res.status(500).json({ error: 'Lỗi tạo đơn hàng' });
//           }

//           const Donhang_id = result.insertId;

//           if (Sanphamjson) {
//               const sanphamValues = JSON.parse(Sanphamjson).map((sanpham) => [
//                   Donhang_id,
//                   sanpham.Sanpham_id,
//                   sanpham.Tensanpham,
//                   sanpham.Anh,
//                   sanpham.Soluong,
//                   sanpham.Gia,
//                   sanpham.Tongtien,
//               ]);

//               db.query(
//                   'INSERT INTO CTDH (Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien, created_at, updated_at) VALUES ?',
//                   [sanphamValues],  // Trải mảng giá trị vào
//                   (error) => {
//                       if (error) {
//                           console.error('Lỗi thêm sản phẩm vào đơn hàng: ' + error.message);
//                           return res.status(500).json({ error: 'Lỗi thêm sản phẩm vào đơn hàng' });
//                       }

//                       res.json({ message: 'Đơn hàng tạo thành công' });
//                   }
//               );
//           } else {
//               res.json({ message: 'Đơn hàng tạo thành công' });
//           }
//       }
//   );
// });


router.post('/api/createOrder1', (req, res) => {
    const {
      Hoten,
      Sdt,
      Email,
      Diachi,
      Ngaydat,
      Tongtien,
      Sanphamjson,
    } = req.body;
  
    // Insert data into DonHang table
    const insertDonHangQuery = `
      INSERT INTO DonHang (Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien)
      VALUES (?, ?, ?, ?, ?, ?)`;
  
    db.query(
      insertDonHangQuery,
      [Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien],
      (err, results) => {
        if (err) {
          console.error('Error inserting into DonHang:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
  
        const Donhang_id = results.insertId;
  
        // Parse Sanphamjson
        let sanphamData;
        try {
          // Check if Sanphamjson is already an object
          if (typeof Sanphamjson === 'string') {
            sanphamData = JSON.parse(Sanphamjson);
          } else {
            // If not a string, try to convert to JSON
            sanphamData = JSON.parse(JSON.stringify(Sanphamjson));
          }
        } catch (error) {
          console.error('Error parsing Sanphamjson:', error);
          res.status(400).send('Invalid JSON format in Sanphamjson');
          return;
        }
  
        // Insert data into CTDH table
        const insertCTDHQuery = `
          INSERT INTO CTDH (Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien)
          VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
        sanphamData.forEach((sanpham) => {
          const {
            Sanpham_id,
            Tensanpham,
            Anh,
            Soluong,
            Gia,
            Tongtien,
          } = sanpham;
  
          db.query(
            insertCTDHQuery,
            [Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien],
            (err) => {
              if (err) {
                console.error('Error inserting into CTDH:', err);
                res.status(500).send('Internal Server Error');
              }
            }
          );
        });
  
        res.json({ Result: '' });
      }
    );
  });
  
  


// {
//     "Hoten": "John DHcuoi",
//     "Sdt": "0987654321",
//     "Email": "nguyenvana@example.com",
//     "Diachi": "123 Duong ABC, Quan XYZ, TP HCM",
//     "Ngaydat": "2023-12-13T14:27:13.148Z",
//     "Tongtien": 500000,
//     "Sanphamjson": [
//         {
//             "Sanpham_id": 2,
//             "Tensanpham": "Sản phẩm 2",
//             "Anh": "sp1.jpg",
//             "Soluong": 2,
//             "Gia": 200000,
//             "Tongtien": 400000
//         },
//         {
//             "Sanpham_id": 3,
//             "Tensanpham": "Sản phẩm 3",
//             "Anh": "sp2.jpg",
//             "Soluong": 1,
//             "Gia": 100000,
//             "Tongtien": 100000
//         }
//     ]
// }



// router.post('/api/createOrder', (req, res) => {
//     const {
//       Hoten,
//       Sdt,
//       Email,
//       Diachi,
//       Ngaydat,
//       Tongtien,
//       Sanphamjson,
//     } = req.body;
  
//     // Insert data into DonHang table
//     const insertDonHangQuery = `
//       INSERT INTO DonHang (Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien)
//       VALUES (?, ?, ?, ?, ?, ?)`;
  
//     db.query(
//       insertDonHangQuery,
//       [Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien],
//       (err, results) => {
//         if (err) {
//           console.error('Error inserting into DonHang:', err);
//           res.status(500).send('Internal Server Error');
//           return;
//         }
  
//         const Donhang_id = results.insertId;
  
//         if (Sanphamjson !== null) {
//           // Insert data into CTDH table
//           const insertCTDHQuery = `
//             INSERT INTO CTDH (Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien)
//             VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
//           const sanphamData = JSON.parse(Sanphamjson);
  
//           sanphamData.forEach((sanpham) => {
//             const { Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien } = sanpham;
  
//             db.query(
//               insertCTDHQuery,
//               [Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien],
//               (err) => {
//                 if (err) {
//                   console.error('Error inserting into CTDH:', err);
//                   res.status(500).send('Internal Server Error');
//                 }
//               }
//             );
//           });
//         }
  
//         res.json({ Result: '' });
//       }
//     );
//   });


router.get('/dh',(req,res)=>{
    var query = 'Select * from donhang'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/dh/get-one/:id',function(req,res){
    var query = "Select * from donhang where id = " + req.params.id;
    db.query(query,function(err,result) {
        if(err) res.status(500).send('Loi cau lenh truy van')
        res.json(result);
    })
});

router.get('/ctdh',(req,res)=>{
    var query = 'Select * from ctdh'
    db.query(query,(error,result)=>{
        if(error) res.status(500).send('Loi ket noi');
        res.json(result);
    })
});

router.get('/ctdh/get-one/:id',function(req,res){
  var query = "Select * from ctdh where Donhang_id = " + req.params.id;
  db.query(query,function(err,result) {
      if(err) res.status(500).send('Loi cau lenh truy van')
      res.json(result);
  })
});

router.get('/revenue/monthly', (req, res) => {
  const currentYear = new Date().getFullYear();
  const selectedYear = req.query.year || currentYear;
  const selectedMonth = req.query.month || new Date().getMonth() + 1; // Lấy giá trị tháng từ tham số hoặc sử dụng tháng hiện tại nếu không có

  const query = `
    SELECT MONTH(Ngaydat) AS month, SUM(Tongtien) AS totalRevenue
    FROM donhang
    WHERE YEAR(Ngaydat) = ${selectedYear} AND MONTH(Ngaydat) = ${selectedMonth}
    GROUP BY month
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const totalRevenue = results.length > 0 ? results[0].totalRevenue : 0;
      res.json({ totalRevenue });
    }
  });
});

router.get('/revenue/yearly', (req, res) => {
  const selectedYear = req.query.year || new Date().getFullYear(); // Lấy giá trị năm từ tham số hoặc sử dụng năm hiện tại nếu không có

  const query = `
    SELECT YEAR(Ngaydat) AS year, SUM(Tongtien) AS totalRevenue
    FROM donhang
    WHERE YEAR(Ngaydat) = ${selectedYear}
    GROUP BY year
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const totalRevenue = results.length > 0 ? results[0].totalRevenue : 0;
      res.json({ totalRevenue });
    }
  });
});

router.get('/thongke/yearly', (req, res) => {
  const currentYear = new Date().getFullYear();

  const query = `
    SELECT YEAR(Ngaydat) AS year, SUM(Tongtien) AS totalRevenue
    FROM donhang
    WHERE YEAR(Ngaydat) = ${currentYear}
    GROUP BY year
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const totalRevenue = results.length > 0 ? results[0].totalRevenue : 0;
      res.json({ totalRevenue });
    }
  });
});


// API endpoint để thống kê doanh thu trong tháng
router.get('/thongke/monthly', (req, res) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Lưu ý: Tháng trong JavaScript đếm từ 0
  const currentYear = currentDate.getFullYear();

  const query = `
    SELECT MONTH(Ngaydat) AS month, SUM(Tongtien) AS totalRevenue
    FROM donhang
    WHERE YEAR(Ngaydat) = ${currentYear} AND MONTH(Ngaydat) = ${currentMonth}
    GROUP BY month
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const totalRevenue = results.length > 0 ? results[0].totalRevenue : 0;
      res.json({ totalRevenue });
    }
  });
});

// ...



router.get('/thongke', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const query = `
    SELECT SUM(Tongtien) AS totalRevenue
    FROM donhang
    WHERE Ngaydat >= '${today} 00:00:00' AND Ngaydat <= '${today} 23:59:59'
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const totalRevenue = results.length > 0 ? parseFloat(results[0].totalRevenue) : 0;
      res.json({ totalRevenue });
    }
  });
});


router.get("/donhang/remove/:id", function(req, res) {
  var id = req.params.id;
  var query = "DELETE FROM donhang WHERE id = ?";

  db.query(query, [id], function(err, result) {
      if (err) {
          console.error(err);
          return res.status(500).send('Lỗi truy vấn');
      }
      res.json(result);
  });
});


router.post('/api/createOrder', (req, res) => {
  const {
      Hoten,
      Sdt,
      Email,
      Diachi,
      Ngaydat,
      Tongtien,
      Sanphamjson,
  } = req.body;

  // Insert data into DonHang table
  const insertDonHangQuery = `
    INSERT INTO DonHang (Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
      insertDonHangQuery,
      [Hoten, Sdt, Email, Diachi, Ngaydat, Tongtien],
      (err, results) => {
          if (err) {
              console.error('Error inserting into DonHang:', err);
              res.status(500).send('Internal Server Error');
              return;
          }

          const Donhang_id = results.insertId;

          // Parse Sanphamjson
          let sanphamData;
          try {
              // Check if Sanphamjson is already an object
              if (typeof Sanphamjson === 'string') {
                  sanphamData = JSON.parse(Sanphamjson);
              } else {
                  // If not a string, try to convert to JSON
                  sanphamData = JSON.parse(JSON.stringify(Sanphamjson));
              }
          } catch (error) {
              console.error('Error parsing Sanphamjson:', error);
              res.status(400).send('Invalid JSON format in Sanphamjson');
              return;
          }

          // Insert data into CTDH table
          const insertCTDHQuery = `
        INSERT INTO CTDH (Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

          // Update Số Lượng Sản Phẩm
          const updateSoluongQuery = `
        UPDATE Sanpham SET Soluong = Soluong - ? WHERE id = ?`;

          sanphamData.forEach((sanpham) => {
              const {
                  Sanpham_id,
                  Tensanpham,
                  Anh,
                  Soluong,
                  Gia,
                  Tongtien,
              } = sanpham;

              db.query(
                  insertCTDHQuery,
                  [Donhang_id, Sanpham_id, Tensanpham, Anh, Soluong, Gia, Tongtien],
                  (err) => {
                      if (err) {
                          console.error('Error inserting into CTDH:', err);
                          res.status(500).send('Internal Server Error');
                          return;
                      }

                      // Trừ Số Lượng Sản Phẩm
                      db.query(
                          updateSoluongQuery,
                          [Soluong, Sanpham_id],
                          (err) => {
                              if (err) {
                                  console.error('Error updating Soluong:', err);
                                  res.status(500).send('Internal Server Error');
                              }
                          }
                      );
                  }
              );
          });

          res.json({ Result: '' });
      }
  );
});


router.get('/revenue/statistics', (req, res) => {
  const selectedYear = req.query.year;
  const selectedMonth = req.query.month;
  const selectedDay = req.query.day;

  let query = `
    SELECT`;

  // Xử lý trường hợp chỉ có năm
  if (selectedYear && !selectedMonth && !selectedDay) {
    query += ` YEAR(Ngaydat) AS year, SUM(Tongtien) AS totalRevenue
              FROM donhang
              WHERE YEAR(Ngaydat) = ${selectedYear}
              GROUP BY year`;

  // Xử lý trường hợp có cả tháng và năm
  } else if (selectedYear && selectedMonth && !selectedDay) {
    query += ` YEAR(Ngaydat) AS year, MONTH(Ngaydat) AS month, SUM(Tongtien) AS totalRevenue
              FROM donhang
              WHERE YEAR(Ngaydat) = ${selectedYear} AND MONTH(Ngaydat) = ${selectedMonth}
              GROUP BY year, month`;

  // Xử lý trường hợp có cả ngày, tháng và năm
  } else if (selectedYear && selectedMonth && selectedDay) {
    query += ` YEAR(Ngaydat) AS year, MONTH(Ngaydat) AS month, DAY(Ngaydat) AS day, SUM(Tongtien) AS totalRevenue
              FROM donhang
              WHERE YEAR(Ngaydat) = ${selectedYear} AND MONTH(Ngaydat) = ${selectedMonth} AND DAY(Ngaydat) = ${selectedDay}
              GROUP BY year, month, day`;
  }

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

module.exports=router;
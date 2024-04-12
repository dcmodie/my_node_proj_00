const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '12345678',
  database: 'Company',
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected');
});
//const origin = ctx.get('origin');
//check if you want to allow this origin
//if you want to allow it,
//ctx.set('Access-Control-Allow-Origin', origin);
//else do not set the header or set it something else
//ctx.set('Access-Control-Allow-Origin', 'localhost.com');
const app = express();
app.use(cors());
// handle urlencoded data
app.use(express.urlencoded({ extended: true }));
// handle json data coming from requests mainly post
app.use(express.json());
// var corsOptions = {
//   origin: 'http://localhost.com',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.get('/persons/', (req, res) => {
  let sql = 'SELECT * FROM PERSONS';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// app.get('/persons', (req, res) => {
//   //console.log(res);
//   //res.send('GET request to the homepage')
//   //res.send('hellaao');
//   let sql = 'SELECT * FROM PERSONS';

//   let query = db.query(sql, post, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send('blah');
//   });
// });

app.get('/employee1', (req, res) => {
  console.log(req);
  let post = {
    PersonID: '999',
    LastName: 'Dood',
    FirstName: 'ooo',
    Address: 'aaa',
    City: 'iiii',
  };
  let sql = 'INSERT INTO Persons SET ?';

  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send('Employee 1 added');
  });
});

app.put('/persons/:id', (req, res) => {
  const post = { ...req.body };
  const { id } = req.params;
  console.log('aaaaaa', id);
  res.send('Person updated');

  // Save the employee to the database
  // let sql = 'INSERT INTO Persons SET ?';
  // let query = db.query(sql, post, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.send('Person added');
  // });
});

app.post('/persons/', (req, res) => {
  const post = { ...req.body };
  // Save the employee to the database
  let sql = 'INSERT INTO Persons SET ?';
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send('Person added');
  });
});

app.listen('8000', () => {
  console.log('Server started on port 8000');
});

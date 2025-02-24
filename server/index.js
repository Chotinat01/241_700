/*const http = require('http'); // Import Node.js core module

const host = 'localhost'; // Localhost

const port = 8000; // Port number

// เมื่อเปิด เว็บไปที่ http://localhost:8000/ จะเรียกใช้งาน function requireListener
const requireListener = function (req, res) {
    res.writeHead(200);
    res.end('My first server!');
}

const server = http.createServer(requireListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`); // ` ` แบล้คติ้ก เอาสตรีงกับตัวแปรมาใส่ได้เลย
});
*/
const express = require('express');
const app = express();
<<<<<<< HEAD
<<<<<<< HEAD
const bodyParser = require('body-parser');

=======
const mysql = require('mysql');
=======
const mysql = require('mysql2/promise');
>>>>>>> 1556140 (css update)
const bodyParser = require('body-parser');
>>>>>>> afcc38b (update docker)
const port = 8000;

app.use(bodyParser.json());

let users = [];
<<<<<<< HEAD
let counter = 1;
=======
//let counter = 1;

let conn = null;

const initMysql = async () => {
   conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8820
    })
}
/*
app.get('/testdb', (req, res) => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'tset',
        port: 8830
    }).then((conn) => {
        conn
        .query('SELECT * FROM users')
        .then((result) => {
            res.json(result[0]);
        })
        .catch((error) => {
            console.log('error', error.message);
            res.status(500).json({error: 'Error fetching users'});
        })
    })
});*/

/*
app.get('/testdbnew', (req, res) => {
    try{
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'webdb',
            port: 8830
        })
        const result = await conn.query('SELECT * FROM users');
        res.json(result[0]);

    }catch(error){
        console.log('error', error.message);
        res.status(500).json({error: 'Error fetching users'});
    }

})
*/
>>>>>>> afcc38b (update docker)

/*
GET /users แสดงข้อมูล get users ทั้งหมด
POST /users สร้างข้อมูล user ใหม่ที่ต้องการเพิ่มเข้าไป
GET /users/:id แสดงข้อมูล user ที่ต้องการดู รายคน
PUT /users/:id แก้ไขข้อมูล user ที่ต้องการแก้ไข รายคน
DELETE /users/:id ลบข้อมูล user ที่ต้องการลบ รายคน
*/ 

//ใช้แสดงuser ทั้งหมด
<<<<<<< HEAD
app.get('/users', (req, res) => {
    res.json(users);
=======
app.get('/users', async(req, res) => {
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0]);
>>>>>>> afcc38b (update docker)
})


app.get('/test', (req, res) => {  /* ('/ ชื่อpath ') */ 
    let user = {
        name: 'John',
        age: 30
    };
    res.json(user);
})

<<<<<<< HEAD
//สร้าง path แสดง /user ใช้แสดงข้อมูล USER ใหม่
app.post('/user', (req, res) => {
=======

//สร้าง path แสดง /user ใช้แสดงข้อมูล USER ใหม่
/*app.post('/user', (req, res) => {
>>>>>>> afcc38b (update docker)
    let user = req.body;
    user.id = counter;
    counter += 1;
    users.push(user);
    res.json({
        message: 'User created',
        user: user
    });
})
<<<<<<< HEAD

//path = put ใช้แก้ไขข้อมูล user โดยใช้ id เป็นตัวกำหนด
app.put('/user/:id', (req, res) => {
=======
*/
app.post('/users', async (req, res) => {
    let user = req.body;
    const result = await conn.query('INSERT INTO users SET ?', user);
    console.log('result', result);
    res.json({
        message: 'User created',
        data: result[0]
    })
});

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    //ค้นหา user หรือ index ที่ต้องการดึงข้อมูล
    let selectedIndex = users.findIndex(user => user.id == id);

    res.json(users[selectedIndex]);
});


//path = put ใช้แก้ไขข้อมูล user โดยใช้ id เป็นตัวกำหนด
app.put('/users/:id', (req, res) => {
>>>>>>> afcc38b (update docker)
    let id = req.params.id;
    let updateUser = req.body;
    // หา user จาก id ที่รับมา
    let selectedIndex = users.findIndex(user => user.id == id);
    
    // แก้ไขข้อมูล user ที่หาเจอ
<<<<<<< HEAD
    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }
=======
    //if (updateUser.firstname) {
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
    //}
    //if (updateUser.lastname) {
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;
    //}
    users[selectedIndex].age = updateUser.age || users[selectedIndex].age;
    users[selectedIndex].gender = updateUser.dender || users[selectedIndex].gendernode;

>>>>>>> afcc38b (update docker)

    res.json({
        message: 'User updated successfully',
        data: {
            user: updateUser,
            indexUpdated: selectedIndex
        }
    })

    // delete ใช้ลบข้อมูล user โดยใช้ id เป็นตัวกำหนด
    app.delete('/user/:id', (req, res) => {
        let id = req.params.id;
        // หา index ที่ต้องการลบ
        let selectedIndex = users.findIndex(user => user.id == id);
        // ลบข้อมูลที่ต้องการ
        users.splice(selectedIndex, 1); // ลบข้อมูลที่ต้องการ
        res.json({
            message: 'User deleted successfully',
            indexDeleted: selectedIndex
         })
    })
});



<<<<<<< HEAD
app.listen(port, (req, res) => {
     console.log('Http Server is running on port', + port);
 });
=======
app.listen(port, async (req, res) => {
    await initMysql();
    console.log('Http Server is running on port', + port);
});
>>>>>>> afcc38b (update docker)

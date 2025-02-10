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
const bodyParser = require('body-parser');

const port = 8000;

app.use(bodyParser.json());

let users = [];
let counter = 1;

/*
GET /users แสดงข้อมูล get users ทั้งหมด
POST /users สร้างข้อมูล user ใหม่ที่ต้องการเพิ่มเข้าไป
GET /users/:id แสดงข้อมูล user ที่ต้องการดู รายคน
PUT /users/:id แก้ไขข้อมูล user ที่ต้องการแก้ไข รายคน
DELETE /users/:id ลบข้อมูล user ที่ต้องการลบ รายคน
*/ 

//ใช้แสดงuser ทั้งหมด
app.get('/users', (req, res) => {
    res.json(users);
})


app.get('/test', (req, res) => {  /* ('/ ชื่อpath ') */ 
    let user = {
        name: 'John',
        age: 30
    };
    res.json(user);
})

//สร้าง path แสดง /user ใช้แสดงข้อมูล USER ใหม่
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter += 1;
    users.push(user);
    res.json({
        message: 'User created',
        user: user
    });
})

//path = put ใช้แก้ไขข้อมูล user โดยใช้ id เป็นตัวกำหนด
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    // หา user จาก id ที่รับมา
    let selectedIndex = users.findIndex(user => user.id == id);
    
    // แก้ไขข้อมูล user ที่หาเจอ
    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

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



app.listen(port, (req, res) => {
     console.log('Http Server is running on port', + port);
 });
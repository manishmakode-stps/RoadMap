const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json');
const fs = require('fs');


// these are the inbuilt middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const middlware1 = (req,res,next)=>{
    console.log("this is application level middleware 1");
    next();
}

const middlware2 = (req,res,next)=>{
    console.log("this is application level middleware 2");
    next();
}

// middlware chaining
app.use(middlware1, middlware2);


app.get('/', (req, res) => {
    res.send('this is home page');
})

app.get('/api/users', (req, res) => {
    res.json(users);
})

// this the example of server side rendering
app.get('/users', (req, res) => {
    const html = `<ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>`
    res.send(html);
})


// dynamic path parameter, it is different from query parameter 
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    res.json(user);
})

// add user
app.post('/api/users', (req, res) => {
    const body = req.body;

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).send("all fields are required");
    }

    if(body.email && users.find((user) => user.email == body.email)){
        return res.status(400).send("email already exists");
    }

    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        console.log(`user added successfully ${newUser}`);
        res.send({ message: "user added successfully", newUser });
    })
})

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id == id);
    users.splice(index, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), () => {
        console.log(`user deleted successfully`);
        res.send("user deleted successfully");
    });
})

app.patch('/api/users', (req, res) => {
    const body = req.body;
    const updatedUser = users.map((user) => {
        if (user.id == body.id) {
            const newUser = {
                ...user,
                ...body
            }
            // console.log("updated user", newUser);
            return newUser
        }
        return user
    }
    )
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUser), () => {
        console.log(`user updated successfully`);
        res.send("user updated successfully");
    });
})

app.listen(3050, () => {
    console.log("server is listening on port 3050");
})
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [{
    id: 1,
    title: "Task1",
    description: "Task1 description",
    isComplete: true
}, {
    id: 2,
    title: "Task2",
    description: "Task2 description",
    isComplete: false
}, {
    id: 3,
    title: "Task3",
    description: "Task3 description",
    isComplete: true
}
]

app.get('/',(req,res)=>{
    res.send("Backend for useMutations");
})

app.get('/tasks',(req,res)=>{
    res.send({
        tasks,
        status:"success"
    })
})

app.post('/tasks',(req,res)=>{
    const {title, description} = req.body;
    tasks.push({
        title,
        description,
        isComplete:"false",
        id: new Date().getTime()
    })
    res.send({
        status:"success",
        message:"Task added successfully"
    })
})

app.delete('/tasks/:id',(req, res)=>{
    const id = req.params.id;
    tasks = tasks.filter(task => task.id != id);
    res.send({
        status:"success",
        message:"Task deleted successfully"
    })
})

app.listen(3000,()=>{
    console.log(`Server is running on port 3000 and totals tasks are ${tasks.length}`);
});
// Load environment

require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors("*"))


let todos = [
    {id: 1, task: "Finish week 4 slides", completed: false},
    {id: 2, task: "Deploy API today", completed: false}
] 

// GET ALL
app.get("/todo_app", (req, res) => res.status(200).json(todos))
    

// POST NEW
app.post("/todos", (req, res) => {
    const {task} = req.body
    if(!req.body.task) return res.status(404).json({message: "Task Needed"})
    const newTodo = {id:todos.length + 1, task, completed: false}
    todos.push(newTodo)
    res.status(201).json({message: "Created"})  // or .json(newTodo)
    
})

// GET ONE
app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id === id)
    if(!todo) return res.status(404).json({error: "Not found"})
    res.status(200).json(todo)
})

// PATCH UPDATE
app.patch("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id ===id)
    if(!todo) return res.status(404).json({error: "Not found"})
    Object.assign(todo, req.body)
    res.status(200).json(todo)
})

// DELETE
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const previousLength = todos.length;
    todos = todos.filter((t) => t.id !== id);
    if(todos.length === previousLength) return
        res.status(404).json({error: "Not found"})
    res.status(204).send()
});















const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
})
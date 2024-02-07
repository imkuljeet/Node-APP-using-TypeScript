"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newToDo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newToDo);
    res.status(201).json({ message: 'Added Todo', todo: newToDo, todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => {
        todoItem.id === tid;
    });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'Updated Todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id' });
});
router.delete('/todo/:tododId', (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.tododId);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;

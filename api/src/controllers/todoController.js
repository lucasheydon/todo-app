import mongoose from 'mongoose';
import { ToDoSchema } from "../models/todoModel.js";

const ToDo = mongoose.model('ToDoItem', ToDoSchema);

export const addNewToDoItem = (req, res) => {
    const newToDo = new ToDo(req.body);

    newToDo.save((err, todo) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(todo);
        }
    })
}

export const updateToDoItem = (req, res) => {
    ToDo.findOneAndUpdate({_id: req.params.todoID}, req.body, {
        new: true, useFindAndModify: false
    },(err, todo) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json(todo);
        }
    })
}

export const getToDoItem = (req, res) => {
    ToDo.find({}, (err, todo) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json(todo);
        }
    })
}
        

export const getToDoItemById = (req, res) => {
    ToDo.findById(req.params.todoID, (err, todo) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json(todo);
        }
    })
}

export const deleteToDoItem= (req, res) => {
    ToDo.remove({_id: req.params.todoID}, (err, todo) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json({
                message: "Deleted Successfully!"
            });
        }
    })
}
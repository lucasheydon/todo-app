
import {
    addNewToDoItem,
    deleteToDoItem,
    getToDoItemById,
    getToDoItem,
    updateToDoItem
} from "../controllers/todoController.js";

export const todoroutes = (app) => {
    app.route('/todo')
        // Get all todo items
        .get(getToDoItem)
        // Create new todo item
        .post(addNewToDoItem);

    app.route('/todo/:todoID')
        // Update todo item
        .put(updateToDoItem)
        // Get todo item by ID
        .get(getToDoItemById)
        // Delete todo item
        .delete(deleteToDoItem)
}
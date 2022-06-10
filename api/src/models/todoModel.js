import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ToDoSchema = new Schema({
    title: {
        type: String,
    },

});

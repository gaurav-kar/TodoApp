const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
    data: {
        type: String,
        required: [true, "A Todo Item is required"],
    },
});

const Todos = mongoose.model("Todos", todosSchema);

module.exports = Todos;
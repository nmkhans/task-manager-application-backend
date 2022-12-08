const TaskModel = require("../models/TaskModel");

//? create a new task
const createTask = async (req, res) => {
    try {
        const data = req.body;
        const result = await TaskModel.create(data);

        res.status(200).json({
            success: true,
            message: "Task successfully created.",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create task!",
            error: error
        });
    }
}

//? get tasks
const getTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});

        res.status(200).json({
            success: true,
            message: "All task fetched.",
            data: data
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: "failed to fetch all task!",
            error: error
        })
    }
}

//? get single task

module.exports = {
    createTask,
    getTasks
}
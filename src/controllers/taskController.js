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
const getSingleTask = async (req, res) => {
    try {

    } catch (error) {

    }
}

//? update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedDoc = {
            $set: data
        }
        const result = await TaskModel.updateOne(
            { _id: id },
            updatedDoc,
            { upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Status updated.",
            data: result
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Status update failed!",
            error: error
        })
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask
}
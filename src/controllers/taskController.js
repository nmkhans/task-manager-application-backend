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

//? delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TaskModel.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "Task deleted.",
            data: result
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Task delete failed.",
            errror: error
        })
    }
}

//? filter task by status
const filterTask = async (req, res) => {
    try {
        const { status, email } = req.query;
        const result = await TaskModel.aggregate([
            { $match: { status: status, email: email } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    status: 1,
                    email: 1,
                    createdDate: {
                        $dateToString: {
                            date: "$createdDate",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "All filtered task fetched.",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side problem!",
            data: error
        })
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    filterTask
}
var models = require('../models');

const taskController = {
    getAllTasks: (req, res) => {
        console.log("Inside getAllTasks");
        //Get all task
        models.Task.findAll({}).then(function (tasks) {
            res.json(tasks);
        })
            .catch(err => {
                res.send("error: " + err)
            })
    },

    getActiveTasks: (req, res) => {
        console.log("Inside getActiveTasks");
        //Get all task
        models.Task.findAll({
            where: {
                active: true
            }
        }).then(function (tasks) {
            res.json(tasks);
        })
            .catch(err => {
                res.send("error: " + err)
            })
    },

    getDoneTasks: (req, res) => {
        console.log("Inside getDoneTasks");
        //Get all task
        models.Task.findAll({
            where: {
                active: true,
                done: true
            }
        }).then(function (tasks) {
            res.json(tasks)
        })
            .catch(err => {
                res.send("error: " + err)
            })
    },

    addTask: (req, res) => {
        // Add a new task
        if (!req.body.task_name) {
            res.status(400);
            res.json({
                error: "Bad Data for POST"
            })
        } else {
            //console.log("Task data is " + JSON.stringify(req.body))
            models.Task.create({
                task_name: req.body.task_name,
                active: true,
                done: false
            }).then(function (task) {
                res.json(task);
            }).catch(err => {
                res.send("Error: " + err)
            })
        }
    },

    updateTask: (req, res) => {
        if (!req.body.task_name && !req.params.id) {
            res.status(400);
            res.json({
                error: "Bad Data..."
            })
        } else {
            models.Task.update(
                {
                    task_name: req.body.task_name,
                    active: req.body.active,
                    done: req.body.done
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then(function (task) {
                    res.json(task);
                }).catch(err => {
                    res.send("Error: " + err)
                })
        }
    }

};
module.exports = taskController;
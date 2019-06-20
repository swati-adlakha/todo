var express = require('express'), router = express.Router();
const taskController = require('../controllers/task');

module.exports = (req, resp ) => {

    /* Task routes */
    //This API is to get all tasks
    router.get('/v1/task/all', taskController.getAllTasks);
    //This API is to get active tasks
    router.get('/v1/task/active', taskController.getActiveTasks);
    //This API is to get done tasks
    router.get('/v1/task/done', taskController.getDoneTasks);
    //This API is to add a new task
    router.post('/v1/task', taskController.addTask);
    //This API is to update/delete task
    router.put('/v1/task/:id', taskController.updateTask);

    return router;
};
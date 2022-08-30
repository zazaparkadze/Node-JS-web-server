const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyROLES = require('../../middleware/verifyROLES');

router
    .route('/')
    .get(employeesController.getAllEmployees)
    .post(
        verifyROLES(ROLES_LIST.admin, ROLES_LIST.editor),
        employeesController.createEmployee
    )
    .put(
        verifyROLES(ROLES_LIST.admin, ROLES_LIST.editor),
        employeesController.updateEmployee
    )
    .delete(verifyROLES(ROLES_LIST.admin), employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;

const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const result = await Employee.find();
    res.json({ result });
    console.log(result);
};

const createEmployee = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    try {
        if (!firstname || !lastname)
            return res
                .status(400)
                .json({ error: 'firstname and lastname are required!!!' });

        const result = await Employee.create({
            firstname: firstname,
            lastname: lastname,
        });
        res.status(201).json(result);
        console.log('entry for new employee is created');
    } catch (err) {
        console.log(err);
    }
};

const updateEmployee = async (req, res) => {
    try {
        if (!req?.body?.id)
            return res
                .status(400)
                .json('id required, one of the names required!');
        const foundEmployee = await Employee.findOne({
            _id: req.body.id,
        }).exec();

        if (!foundEmployee)
            return res
                .status(401)
                .json({ message: `no user with ${eq.body.id} id` });

        if (!req.body.firstname || !req.body.lastname)
            return res
                .status(400)
                .json({ message: `firstname and lastname are requied!!` });
        foundEmployee.firstname = req.body.firstname;
        foundEmployee.lastname = req.body.lastname;
        const result = await foundEmployee.save();
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const foundEmployee = await Employee.findOne({
            _id: req.body.id,
        }).exec();
        if (!foundEmployee)
            return res
                .status(401)
                .json({ message: `no user ${req.body.id} exists` });
        const result = await Employee.deleteOne({ _id: req.body.id });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const getEmployee = async (req, res) => {
    const foundEmployee = await Employee.findOne({
        _id: req.params.id,
    }).exec();
    if (!foundEmployee)
        return res
            .status(400)
            .json({ message: `no user ${req.params.id} exists` });
    console.log(req);
    res.status(200).json(foundEmployee);
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
};

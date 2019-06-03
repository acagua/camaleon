
var express = require('express');

var app = express();

var Department = require('../models/department.js');
var City = require('../models/city.js');

//---------------------------------------------------------------------------ROUTES
app.get('/departments', function (req, res)
{
    Department.find({})
        .exec(
            function (err, docs)
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error retrieving departments',
                        errors: err
                    });
                }
                else
                {
                    return res.status(200).json({
                        ok: true,
                        documents: docs
                    });
                }
            });
});


app.get('/cities/:departmenteCode', function (req, res)
{
    var departmenteCode = req.params.departmenteCode

    City.find({ _departmentCode: departmenteCode })
        .exec(
            function (err, docs)
            {
                if (err)
                {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error retrieving cities',
                        errors: err
                    });
                }
                else
                {
                    return res.status(200).json({
                        ok: true,
                        documents: docs
                    });
                }
            });
});


module.exports = app;
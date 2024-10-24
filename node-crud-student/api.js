const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');

/*
router.get('/save', async function (req, res) {
    try {
        const newStudent = new StudentModel({
            StudentId: 123,
            Name: "Sam", Roll: 1, Birthday: 2001 - 9 - 8
        });
    
    
        const query = await newStudent.save()
    
        return res.json({
            data: query
        })
    } catch (error) {
        return res.json({
            message: "Something went wrong!!!"
        })
    }
    
});
*/

router.post('/save', async function (req, res) {
    
    try {
        const newStudent = new StudentModel({
            StudentId : req.body.StudentId,
            Name : req.body.Name,
            Roll : req.body.Roll,
            Birthday : new Date(req.body.Birthday),
            Address : req.body.Address
        });
         
    
    const query = await newStudent.save()

    return res.json({
        data: query
    });

    }catch (error) {
        return res.json({
            message: "Something went wrong!!!"
        })
    }
});

router.get('/findall', async function (req, res) {
    try {
        const students = await StudentModel.find();
        res.send(students);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Something went wrong!!!"
        });
    }
});

router.get('/findfirst', async function (req, res) {
    try {
        const students = await StudentModel.findOne({StudentId: {$gt: 123}}); //gt: greater than 
        res.send(students);   
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Something went wrong!!!"
        })
    }
    
});

router.post('/delete', async function (req, res) {
    try {
        const result = await StudentModel.deleteOne({ StudentId: req.body.StudentId });
        if (result.deletedCount > 0) {
            res.send("Student has been deleted");
            console.log("Data Deleted!");
        } else {
            res.status(404).send("Student not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Something went wrong!"
        });
    }
});

router.post('/update', async function(req, res) {
    try {
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { StudentId: req.body.StudentId },
            {
                Name: req.body.Name,
                Roll: req.body.Roll,
                Birthday: new Date(req.body.Birthday),
                Address: req.body.Address
            },
            { new: true }
        );

        if (updatedStudent) {
            res.json({
                message: "Student updated successfully",
                data: updatedStudent
            });
        } else {
            res.status(404).send("Student not found");
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Something went wrong!"
        });
    }
});

module.exports = router;

const express = require('express');
// import express from "express"
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appoinmentsRouter = require('./routes/appointments')
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
 
app.use(cors());
app.use(bodyParser.json());
 
// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://vaibhav:vaibhav@cluster0.mk1td.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const _dirname = path.resolve();

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
 
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appoinmentsRouter)

app.use(express.static(path.join(_dirname, "/Frontend/build")));
app.get('*', (_, res) =>{
    res.sendFile(path.resolve(_dirname, "Frontend", "build", "index.html"));
})
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
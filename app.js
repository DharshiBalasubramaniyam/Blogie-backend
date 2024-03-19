const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController')

const port = 9000;
const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/first')
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log('Application is running on port ' + port)
        })
    })
    .catch(
        (error) =>  {
            console.error("Error connecting to MongoDB:", error);
        }
    );


app.get('/users', userController.getAllUsers);

app.post('/new', userController.addUser)

app.put('/update/:id', userController.updateUser)

app.delete('/delete/:id', userController.deleteUser)

app.get('/user/:id', userController.getUserById);



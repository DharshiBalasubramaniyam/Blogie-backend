const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const port = 9000;
const app = express();
app.use(bodyParser.json())

// todo: check post and put
// todo: configure and structure the project
// todo: handle exceptions

mongoose.connect('mongodb://127.0.0.1:27017/first')
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log("Application is running on port " + port);
        });
    })
    .catch(error => console.error("Error connecting to MongoDB:", error));

const userSchema = mongoose.Schema({
    name: {
        require:true,
        type: String
    }, 
    age: {
        require:true,
        type: Number
    },
    email: {
        require:true,
        type: String
    }
})

const User = mongoose.model('User', userSchema)

app.get('/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
});

app.post('/new', async (req, res) => {
    const newUser = await User.create(req.body)
    res.send(newUser)
})

app.put('/update/:id', async (req, res) => {
    const updatedUser = await User.findOneAndUpdate(req.params.id, req.body)
    res.send(updatedUser)
})

app.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.send("User deleted successfully!")
})

app.get('/user/:email', async (req, res) => {
    const {email} = req.params
    const user = await User.findOne({email: email})
    res.json(user);
});

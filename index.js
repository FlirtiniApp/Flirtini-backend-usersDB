const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model'); 


// Connect to the database and start the server
console.log("Connecting to database...");
mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@flirtini.5tabe6e.mongodb.net/Flirtini?retryWrites=true&w=majority&appName=Flirtini`)
    .then(() => {
        console.log("Connected to database");
        app.listen(port, () => {
            console.log(`App listening on port ${port}.`);
        });
    })
    .catch((err) => {
        console.log("Failed to connect to database");
        console.log(err);
    });


// Handler for creating a user
async function createUserHandler(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handler for getting all users
async function getUserHandler(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// User creation route
app.post('/users/create', createUserHandler);
            
// All users retrieval route
app.get('/users', getUserHandler);

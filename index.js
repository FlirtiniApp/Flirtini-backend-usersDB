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
        console.log("\x1b[35mConnected to database\x1b[0m");
        app.listen(port, () => {
            console.log(`\x1b[34mApp listening on port ${port}.\x1b[0m`);
        });
    })
    .catch((err) => {
        console.log("\x1b[41mFailed to connect to database\x1b[0m");
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

// Handler for getting users
async function getUserHandler(req, res) {
    try {
        const {id} = req.params;

        const users = id === "all" ? await User.find({}) : await User.findById(id);

        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handler for updating a user
async function updateUserHandler(req, res) {
    try {
        const {id} = req.params;

        const newUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!newUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// User creation route
app.post('/users/create', createUserHandler);
            
// All users retrieval route
app.get('/users/:id', getUserHandler);

// User update route
app.put('/users/:id', updateUserHandler);

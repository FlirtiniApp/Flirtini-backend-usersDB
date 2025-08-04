const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

// Connect to the database and start the server
console.log("Connecting to database...");
mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@flirtini.5tabe6e.mongodb.net/Flirtini?retryWrites=true&w=majority&appName=Flirtini`)
    .then(() => {
        console.log("\x1b[93mConnected to database\x1b[0m");
        app.listen(port, () => {
            console.log(`\x1b[35mApp listening on port ${port}.\x1b[0m`);
        });
    })
    .catch((err) => {
        console.log("\x1b[41mFailed to connect to database\x1b[0m");
        console.log(err);
    });

// Handler for getting users
async function getUserHandler(req, res) {
    try {
        const { id } = req.params;

        const users = id === "all" ? await User.find({}) : await User.findById(id);

        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`\x1b[92mGetting\x1b[0m user(s): \x1b[32m${id === "all" ? users.length : users.login}\x1b[0m at: \x1b[36m${new Date().toLocaleString()}\x1b[0m`);

        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handler for creating a user
async function createUserHandler(req, res) {
    try {
        const user = await User.create(req.body);

        console.log(`\x1b[33mCreated\x1b[0m user: \x1b[32m${user.login}\x1b[0m at: \x1b[36m${new Date().toLocaleString()}\x1b[0m`);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handler for updating a user
async function updateUserHandler(req, res) {
    try {
        const { id } = req.params;
        console.log(typeof req.body);

        const newUser = await User.findByIdAndUpdate(id, req.body, { new: true });


        if (!newUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`\x1b[94mUpdated\x1b[0m user: \x1b[32m${newUser.login}\x1b[0m at: \x1b[36m${new Date().toLocaleString()}\x1b[0m with data: ${JSON.stringify(req.body)}`);
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handler for deleting a user
async function deleteUserHandler(req, res) {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`\x1b[31mDeleted\x1b[0m user: \x1b[32m${deletedUser.login}\x1b[0m at: \x1b[36m${new Date().toLocaleString()}\x1b[0m`);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// All users retrieval route
app.get('/users/:id', getUserHandler);

// User creation route
app.post('/users', createUserHandler);

// User update route
app.put('/users/:id', updateUserHandler);

// User deletion route
app.delete('/users/:id', deleteUserHandler);    

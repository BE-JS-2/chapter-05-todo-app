require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const todoRoutes = require('./routes/todo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(todoRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
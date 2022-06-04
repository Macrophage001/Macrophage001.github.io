require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
const postsRoute = require('./routes/postsRoute');
const passWord = 'ygrgwkVhhrTLy62'

mongoose.connect(process.env.MONGO_URI.replace('<password>', passWord), { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => console.log('Connected to Mongo!'))

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(process.env.POSTS_API, postsRoute)

app.listen(port, () => console.log('Listening on port: ' + port));
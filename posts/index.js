const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const posts = {};

// return all posts
app.get('/posts', (req, res) => {
    res.send(posts)
});

// create post
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4002/events', {
        type: "PostCreated",
        data: posts[id]
    })

    res.status(201).send(posts[id])
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
})

// run in this server
app.listen(4000, () => {
    console.log("listening on 4000")
});
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
});

// create comment
app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id, content, postId: req.params.id, status: 'pending'})
    
    commentsByPostId[req.params.id] = comments;

    // send comment event
    await axios.post('http://event-bus-srv:4005/events', {
        type: "CommentCreated",
        data: {
            id, content, postId: req.params.id, status: 'pending'
        }
    })

    res.status(201).send(comments)
});

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);
    const { type, data } = req.body

    // Receive and handle comment moderated
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data

        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })

        // update the in memory comment
        comment.status = status

        // update the event bus with comment updated
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({});
})

app.listen(4001, () => {
    console.log("listening on 4001")
});
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = {};

// client queries all posts to make one request to BE and get info
app.get('/posts', (req, res) => {
    res.send(posts)
})

// updates and handles in memory object in the query service
app.post("/events", (req, res) => {
    const {type, data} = req.body

    // creates post in posts
    if (type === 'PostCreated') {
        const { id, title } = data

        posts[id] = { id, title, comments: []}
    }

    // creats comment inside post in posts obj
    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    // updates comment EX: after comment moderated
    if (type === 'CommentUpdated') {
        const {id, content, status, postId} = data

        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        })

        comment.status = status
        comment.content = content
    }
    console.log(posts);

    res.send({})
})

app.listen(4002, () => {
    console.log('Listening on 4002');
})
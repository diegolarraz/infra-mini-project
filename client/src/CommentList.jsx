export default ({ comments }) => {

    const renderedComments = comments.map(comment => {
        let content

        if (comment.status === 'approved') {
            content = comment.content
        }
        if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation'
        }
        if (comment.status === 'rejected') {
            content = 'this comment has been rejected'
        }
        return (
            <li key={comment.id}>{content}</li>
        )
    })

    return (
        <div>
            {renderedComments}
        </div>
    )
}
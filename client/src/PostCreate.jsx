import React, { useState } from 'react';
import axios from 'axios'

export default () => {
    const [title, setTitle] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        className="form-control" 
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import React, { useState, useEffect } from 'react';

const App = () => {
useEffect(() => {
  console.log("app leve");
}, []);
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
export default App;

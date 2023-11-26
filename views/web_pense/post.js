import React from 'react';

function Post({post}) {
  // Define the share function
  function sharePost() {
    // Get the link of the post
    var link = post.link;
    // Copy the link to the clipboard
    navigator.clipboard.writeText(link);
  }

  // Return the JSX code that renders the post details and the share button
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <img src={post.attachment} />
      <button onClick={sharePost}>Share</button>
    </div>
  );
}

// Export the Post component
export default Post;

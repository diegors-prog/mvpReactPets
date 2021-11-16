import React from 'react';

const CommentPublication = ({ id, item }) => {
  return (
    <section>
      <div>
        <span>{item.comment_author}</span>
        <p>{item.comment_content}</p>
      </div>
    </section>
  );
};

export default CommentPublication;

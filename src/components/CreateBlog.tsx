import React, { useState } from 'react';

const CreateBlog: React.FC = () => {
  const [blogText, setBlogText] = useState('');
  const [blogImage, setBlogImage] = useState<File | null>(null);

  const handleSubmit = () => {
    const timestamp = new Date().toISOString(); // Record the submission time
    // Log the blog data
    console.log({
      text: blogText,
      image: blogImage,
      timestamp,
    });

    // Reset fields after submission
    setBlogText('');
    setBlogImage(null);
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid grey' }}>
      <h2>Create a New Blog Post</h2>
      <div>
        <input
          type='text'
          value={blogText}
          onChange={e => setBlogText(e.target.value)}
          placeholder='Enter blog text...'
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type='file'
          onChange={e =>
            setBlogImage(e.target.files ? e.target.files[0] : null)
          }
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
          Submit Blog Post
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;

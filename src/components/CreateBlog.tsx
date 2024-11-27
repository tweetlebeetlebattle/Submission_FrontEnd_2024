import React, { useState } from 'react';

interface CreateBlogProps {
  onSubmit: (blogText: string, blogImage: File | null) => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onSubmit }) => {
  const [blogText, setBlogText] = useState('');
  const [blogImage, setBlogImage] = useState<File | null>(null);

  // Supported file formats
  const supportedFormats = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && !supportedFormats.includes(file.type)) {
      alert(
        `Unsupported file format. Please upload one of the following: ${supportedFormats.join(', ')}`
      );
      setBlogImage(null); // Clear the file selection
    } else {
      setBlogImage(file);
    }
  };

  const handleSubmit = () => {
    if (!blogText.trim()) {
      alert('Blog text cannot be empty!');
      return;
    }

    console.log({
      text: blogText,
      image: blogImage,
    });

    onSubmit(blogText, blogImage);

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
          accept={supportedFormats.join(',')} // Allow only supported formats
          onChange={handleFileChange}
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

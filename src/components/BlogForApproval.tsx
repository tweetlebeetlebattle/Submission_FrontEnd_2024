import React from 'react';

interface UnapprovedData {
  id: number;
  text: string;
  username: string;
  timestamp: string;
  imageUrl?: string;
}

interface Props {
  data: UnapprovedData;
}

const BlogForApproval: React.FC<Props> = ({ data }) => {
  const handleApprove = () => {
    console.log(`Blog with ID ${data.id} approved.`);
    // You can add API call or state update logic here
  };

  const handleReject = () => {
    console.log(`Blog with ID ${data.id} rejected.`);
    // You can add API call or state update logic here
  };

  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '20px',
        marginBottom: '10px',
      }}
    >
      <h4>{data.text}</h4>
      <p>By: {data.username}</p>
      <p>At: {data.timestamp}</p>
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt='Blog content'
          style={{ maxWidth: '100%' }}
        />
      )}
      <div>
        <button onClick={handleApprove} style={{ marginRight: '10px' }}>
          Approve
        </button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default BlogForApproval;

import React from 'react';

type ProfileHeaderProps = {
  username: string;
  description?: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  description,
}) => {
  return (
    <header
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        borderBottom: '2px solid #ddd',
        marginBottom: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: 0,
          color: '#333',
        }}
      >
        {username}'s Profile
      </h1>
      {description && (
        <p
          style={{
            fontSize: '1.2rem',
            color: '#555',
            marginTop: '10px',
          }}
        >
          {description}
        </p>
      )}
    </header>
  );
};

export default ProfileHeader;
